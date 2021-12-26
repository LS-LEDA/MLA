// Local Processing Service
import store from "@/vuex/store";
import router from "@/router/router";
import Message from "@/services/model/Message";
import {moodle_logs_processing} from "@/services/moodle_logs_processing";

const UNSUPPORTED_FILE_TYPE = -2
const SUPPORTED_FILE_TYPE   = 2

const file_reader = new FileReader()


const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangCa } = require('@nlpjs/lang-ca');
const { LangEs } = require('@nlpjs/lang-es');
const { Language } = require('@nlpjs/language/');

// NLP
const lng_guesser = new Language();

// Progress Status
/*const FILE_UPLOAD = 0;
const DATA_PROCESSING = 1;
const OVERVIEW_GENERATION = 2;
const FINISH = 3;*/

function local_processing(file) {

    // Check if it's a JSON log file
    if ( check_file_type(file.type) === UNSUPPORTED_FILE_TYPE ) {
        return UNSUPPORTED_FILE_TYPE;
    }

    // Messages log file
    file_reader.onload = (event) => {
        let data = JSON.parse(event.target.result);
        // Check whether it's a Moodle Logs or Moodle Forum message Logs file
        if ( Array.isArray(data[0][0])) {
            moodle_logs_processing(data, file.name);
        } else {
            let messages = data[0];
            let forum = {
                "forum_messages": [],
                "messages": 0,
                "users": 0,
                "sentiments": {},
            }

            analyze_sentiment(messages).then( (processed_msg) => {
                forum.forum_messages = processed_msg;
                // Time format conversion
                processed_msg.map( (msg) => {
                    convert_time(msg);
                })
                // Count messages
                forum.messages = processed_msg.length;
                // Count users
                forum.users = count_users(processed_msg);
                // Count sentiment ocurrences
                forum.sentiments = count_sentiments(processed_msg);
                // Store processed messages in vuex
                store.commit('storeForumMessages', forum);
                // Toggle uploaded file boolean and store file name
                store.commit('setImportedData', {which: true, file_name: file.name});
                // Push to Dashboard > Sentiment
                //router.push('/dashboard/sentimental-analysis')
            })
        }
    }

    // Start fake upload progress counting on load file.
    // Start fake data processing
    file_reader.onloadstart = () => {
        store.dispatch('loadProgress', 2000).then(
            () => {
                setTimeout( () => {
                    if ( store.state.imported_data.moodle_logs && store.state.imported_data.forum_logs ) {
                        router.push('/dashboard/summary');
                    }
                    // Redirect to Summary tab
                    if ( store.state.imported_data.moodle_logs && !store.state.imported_data.forum_logs ) {
                        router.push('/dashboard/summary');
                    }
                    // Redirect to Sentiment tab
                    if ( !store.state.imported_data.moodle_logs && store.state.imported_data.forum_logs ) {
                        router.push('/dashboard/sentimental-analysis');
                    }
                }, 9000)
            }
        );
    }

    // Upload file progress
    // This function will be called only once~twice for small - medium sized files
    /*file_reader.onprogress = (event) => {
        if ( event.lengthComputable ) {
            let progress = parseInt( ((event.loaded / event.total) * 100), 10 );
            console.log( progress );
            console.log(event)
        }
    }*/

    file_reader.readAsText(file)
}

function check_file_type(filetype) {
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE;
    }
    return SUPPORTED_FILE_TYPE;
}

async function analyze_sentiment(messages) {
    let computed_msg = [];

    // Compute sentiment
    for (const msg of messages) {
        // Guess the language of the message
        let lng_guess = lng_guesser.guess(msg.message);

        const container = new Container();

        switch (lng_guess[0].alpha2) {
            case 'es':
                container.use( LangEs );
                break;
            case 'ca':
                container.use( LangCa );
                break;
        }

        const sentiment = new SentimentAnalyzer({ container });

        // Analyze message sentiment
        const result = await sentiment.process({ locale: lng_guess[0].alpha2, text: msg.message });

        // Store the computed message
        computed_msg.push(
            new Message(msg.userfullname, msg.subject, msg.created, msg.message, result.sentiment.vote)
        );
    }

    return computed_msg;
}

function convert_time(msg){
    // Calculate time
    let a = new Date(msg.created * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();

    msg.created = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

    return msg;
}

function count_users(messages) {
    let dict = {};
    let count = 0;
    messages.forEach( (msg) => {
        dict[msg.username] = (dict[msg.username] + 1) || count++;
    })
    return count;
}

function count_sentiments(messages) {
    let sentiments_count = {};
    messages.forEach( (msg) => {
        sentiments_count[msg.sentiment] = (sentiments_count[msg.sentiment] + 1) || 1;
    });
    return sentiments_count;
}

export { local_processing }
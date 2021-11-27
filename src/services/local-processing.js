// Local Processing Service
import store from "@/vuex/store";
import router from "@/router/router";
import Message from "@/services/model/Message";

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

function local_processing(file) {

    // Check if it's a JSON log file
    if ( check_file_type(file.type) === UNSUPPORTED_FILE_TYPE ) {
        return UNSUPPORTED_FILE_TYPE;
    }

    // Messages log file
    file_reader.onload = (event) => {
        let data = JSON.parse(event.target.result);
        let messages = data[0];

        analyze_sentiment(messages).then( (processed_msg) => {
            // Time format conversion
            processed_msg.map( (msg) => {
                convert_time(msg);
            })
            // Store processed messages in vuex
            store.commit('storeForumMessages', processed_msg);
            // Push to Dashboard > Sentiment
            router.push('/dashboard/sentimental-analysis')
        })
    }

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

export { local_processing }
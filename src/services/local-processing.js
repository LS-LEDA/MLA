// Local Processing Service
import store from "@/vuex/store";
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
        return UNSUPPORTED_FILE_TYPE
    }

    // Messages log file
    file_reader.onload = (event) => {
        let data = JSON.parse(event.target.result)
        let messages = data[0]
        let forum = {};

        analyze_sentiment(messages).then( (processed_msg) => {

            // Save processed messages to forum
            forum.forum_messages = processed_msg;

            // Count users & store it to forum
            forum.total_users = count_users(processed_msg);

            // Store forum in vuex
            store.commit('storeForumMessages', forum)
        })
    }

    file_reader.readAsText(file)
}

function check_file_type(filetype) {
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE
    }
    return SUPPORTED_FILE_TYPE
}

async function analyze_sentiment(messages) {
    let computed_msg = [];

    // Compute sentiment
    messages.map( async (msg) => {
        // Guess the language of the message
        let lng_guess = lng_guesser.guess(msg.message)

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
        )
    });

    return computed_msg
}

function count_users(messages) {
    let users_counter = {};

    messages.forEach( (msg) => {
        users_counter[msg.username] = (users_counter[msg.username] + 1) || 1;
    });

    return users_counter.length
}

export { local_processing }
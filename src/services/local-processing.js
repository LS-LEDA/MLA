// Local Processing Service
import store from "@/vuex/store";

const UNSUPPORTED_FILE_TYPE = -2
const SUPPORTED_FILE_TYPE   = 2

const file_reader = new FileReader()


const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangCa } = require('@nlpjs/lang-ca');
const { LangEs } = require('@nlpjs/lang-es');
const {Language} = require('@nlpjs/language/src/language');

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

        analyze_sentiment(messages).then()

        // Store message in vuex
        store.commit('storeForumMessages', messages)
    }

    file_reader.readAsText(file)
}

function check_file_type(filetype) {
    console.log(filetype)
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE
    }
    return SUPPORTED_FILE_TYPE
}

async function analyze_sentiment(messages) {
    // Compute sentiment
    messages.map( async (msg) => {
        // Guess the language of the message
        let lng_guess = lng_guesser.guess(msg.message)
        console.log(lng_guess)

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

        const result = await sentiment.process({ locale: lng_guess[0].alpha2, text: msg.message });
        console.log(result)
    })
}
export { local_processing }
import {Container} from "@nlpjs/core";
import {LangEs} from "@nlpjs/lang-es";
import {LangCa} from "@nlpjs/lang-ca";
import {LangEn} from "@nlpjs/lang-en";
import {SentimentAnalyzer} from "@nlpjs/sentiment";
import Message from "@/services/model/Message";
import store from "@/vuex/store";
import {Language} from "@nlpjs/language";
import {analyze_emotion} from "@/services/ai_processing";

// NLP
const lng_guesser = new Language();

function forum_logs_processing(data, file_name) {
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

        // Don't apply emotion analysis if the feature is not enabled
        if (!store.state.settings.general.ai) {
            // Store processed messages in vuex
            store.commit('storeForumMessages', forum);
            // Toggle uploaded file boolean and store file name
            store.commit('setImportedData', {which: true, file_name: file_name});
            return;
        }
        analyze_emotion(processed_msg).then( () => {
            // Store processed messages in vuex
            store.commit('storeForumMessages', forum);
            // Toggle uploaded file boolean and store file name
            store.commit('setImportedData', {which: true, file_name: file_name});
        });
        // Push to Dashboard > Sentiment
        //router.push('/dashboard/sentimental-analysis')
    })
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
            case 'en':
                container.use( LangEn );
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

export { forum_logs_processing };
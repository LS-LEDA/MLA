class Message {
    constructor(username, subject, created, message, sentiment, emotion) {
        this.username = username;
        this.subject = subject;
        this.created = created;
        this.message = message;
        this.sentiment = sentiment;
        this.emotion = emotion
    }
}

export default Message;
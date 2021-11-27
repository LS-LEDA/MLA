class Message {
    constructor(username, subject, created, message, sentiment) {
        this.username = username;
        this.subject = subject;
        this.created = created;
        this.message = message;
        this.sentiment = sentiment;
    }
}

export default Message;
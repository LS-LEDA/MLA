class Log {
    constructor(date, id, name, course, type, interaction, client, ip) {
        this.date = date;
        this.id = id;
        this.name = name;
        this.course = course;
        this.type = type;
        this.interaction = interaction;
        this.client = client;
        this.ip = ip;
    }
}

export default Log;
class Log {
    constructor(date, id, name, course, type, interaction, client, ip) {
        this.date = date;
        this.yearMonthDate = this.year_month_date()
        this.id = id;
        this.name = name;
        this.course = course;
        this.type = type;
        this.interaction = interaction;
        this.client = client;
        this.ip = ip;
    }

    year_month_date() {
        return  this.date.substr(6, 4) +
                this.date.substr(3, 2) +
                this.date.substr(0, 2);
    }
}


export default Log;
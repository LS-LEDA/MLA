class Log {
  constructor(date, id, name, course, type, interaction, client, ip) {
    this.date = date;
    this.yearMonthDate = this.year_month_date(false);
    this.yearMonthDayHour = this.year_month_date(true);
    this.timestamp = Date.parse(this.yearMonthDayHour) / 1000;
    this.id = id;
    this.name = name;
    this.course = course;
    this.type = type;
    this.interaction = interaction;
    this.client = client;
    this.ip = ip;
  }

  /**
   * Delete '/' and retrieve Year - Month - Date
   * @param withTime Whether to include time in the final
   * computed date or not.
   * @returns {string} Computed date
   */
  year_month_date(withTime) {
    let date = '';
    let month = '';
    let year = '';
    let format_offset = 1;

    // If the timestamp doesn't have 10 chars, then we prepend 0 - 01/12/2021
    let only_date = this.date.split(' ')[0];
    if (only_date.length !== 10) {
      date = '0';
      format_offset = 0;
    }

    for (let i = 0; i < only_date.length; i++) {
      // Skip '/' date separator
      if (only_date[i] === '/') continue;

      if (i <= 1 + format_offset) {
        date += only_date[i];
      } else {
        if (i <= 4 + format_offset) {
          month += only_date[i];
        } else {
          year += only_date[i];
        }
      }
    }

    if (!withTime) {
      return year + month + date;
    } else {
      return year + '-' + month + '-' + date + ' ' + this.date.split(' ')[1];
    }
  }
}

export default Log;

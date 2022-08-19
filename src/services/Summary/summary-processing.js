function summary_processing(logs) {
    let type = {};
    logs.forEach( (log) => {
        // Process all types of logs and count each one of them
        if ( type[log.type] !== undefined ) {
            type[log.type].count +=1;
            type[log.type].interactions[log.interaction] = (type[log.type].interactions[log.interaction] + 1) || 1;
        } else {
            type[log.type] = {
                count: 1,
                interactions: {}
            }
            type[log.type].interactions[log.interaction] = 1;
        }
    })

    return type;
}

/**
 * Processes the interactions in a span of a week.
 * For each log, check the timestamp and extract
 * week day and hour.
 * @param logs
 */
function weekly_interactions_processing(logs) {
    const days = 7;
    const hours = 24;
    // Create the matrix for echarts heatmap and fill the third param which is the counter
    // [yAxis, xAxis, value]
    let weekly_interactions = new Array(days * hours);

    // Initialize the values of the matrix, to empty
    for (let i = 0; i < weekly_interactions.length; i++) {
        weekly_interactions[i] = '-';
    }

    let index, offset, matrix_pos;

    // Matrix in array-like format
    logs.forEach( log => {
        let date = new Date(log.timestamp * 1000);
        index = date.getDay();
        offset = date.getHours();

        //day : yAxis - date value
        //mon : 6 - 1
        //tue : 5 - 2
        //wed : 4 - 3
        //thu : 3 - 4
        //fri : 2 - 5
        //sat : 1 - 6
        //sun : 0 - 0
        if ( index !== 0 ) {
            // For all days, get total days value (7) and subtract with day, except for Sun.
            // 7 - saturday (6) = 1 yAxis
            index = days - index;
        }
        matrix_pos = (index * hours) + offset;
        if (weekly_interactions[matrix_pos] === '-') {
            weekly_interactions[matrix_pos] = new Array(3);
            weekly_interactions[matrix_pos][0] = offset;
            weekly_interactions[matrix_pos][1] = index;
            weekly_interactions[matrix_pos][2] = 0;
        }
        weekly_interactions[ (index * hours) +   offset][2]++;
    });

    //console.log(weekly_interactions)
    return weekly_interactions;
}

export { summary_processing, weekly_interactions_processing };
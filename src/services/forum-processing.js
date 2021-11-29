import {summary_processing} from "@/services/Summary/summary-processing";
import Log from "@/services/model/Log";

function forum_processing(data){
    let logs = [];

    data[0].forEach( (lg) => {
        logs.push(
            new Log(lg[0], lg[1], lg[2], lg[3], lg[4], lg[5], lg[6], lg[7], lg[8])
        )
    })

    summary_processing(logs);
}

export { forum_processing };
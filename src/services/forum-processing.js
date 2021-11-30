import {summary_processing} from "@/services/Summary/summary-processing";
import Log from "@/services/model/Log";
import store from "@/vuex/store";

function forum_processing(data){
    let logs = [];

    data[0].forEach( (lg) => {
        logs.push(
            new Log(lg[0], lg[1], lg[2], lg[3], lg[4], lg[5], lg[6], lg[7], lg[8])
        )
    })

    let summary_types = summary_processing(logs);

    store.commit('saveSummaryTypes', {
        total_interactions: logs.length,
        summary_types: summary_types
        }
    );
}

export { forum_processing };
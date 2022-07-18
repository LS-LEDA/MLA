import store from "@/vuex/store";

const file_reader = new FileReader()

/**
 * Load human tagged emotions dataset
 * @param file
 */
function load_emotions(file) {
    // Messages log file
    file_reader.onload = (event) => {
        let emotions_list = JSON.parse(event.target.result);

        console.log(emotions_list);
        store.commit('saveEmotions', emotions_list)
    }

    file_reader.readAsText(file);
}

export { load_emotions }
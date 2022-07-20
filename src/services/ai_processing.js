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

function train_ai() {
    let bow = {};   // Bag of Words: Dictionary used to
    let allWords = [];
    let wordReference = {};

    // Get the list from the store, transform the input and generate the bag of words
    store.state.emotions_dataset.forEach( data => {
        let words = data.message.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
        words.forEach( w => {
            if(!bow[w]) bow[w] = 0;
            bow[w]++; // Counting occurrence for word frequency
        });
    });

    allWords = Object.keys(bow);
    allWords.forEach((w, i) => {
        wordReference[w] = i;
    });

}

export { load_emotions, train_ai }
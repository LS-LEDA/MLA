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

    let sentences = store.state.emotions_dataset;
    let emotions = store.state.emotions;

    // Get the list from the store, transform the input and generate the bag of words
    sentences.forEach( data => {
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

    // Generate vectors for sentences
    let vectors = generateVectors(sentences, allWords, wordReference);

}

/**
 * Loops through the sentences and generates a vector of 0s and 1s
 * Assign 1 if the word is in the word reference
 * @param sentences List of sentences
 * @param allWords Array of existing words
 * @param wordReference Map of words and its position
 * @returns Array of vectors
 */
function generateVectors(sentences, allWords, wordReference) {
    return sentences.map( s => {
        // Generate array of all word's length and fill it with 0s
        let vector = new Array( allWords.length ).fill( 0 );
        let words = s.message.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
        // Set the vector's position to 1 if the word is in the word reference
        words.forEach( w => {
            if(w in wordReference) {
                vector[wordReference[w]] = 1;
            }
        });
        return vector;
    });
}

export { load_emotions, train_ai }
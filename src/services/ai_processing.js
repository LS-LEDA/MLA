import store from "@/vuex/store";
import * as tf from '@tensorflow/tfjs';
import {useSettingsStore} from "@/vuex/settingsStore";

let model = null;
let allWords = null;
let wordReference = null;
let emotions = null;

/**
 * Load human tagged emotions dataset
 * @param file
 */
function load_emotions(file) {
    const file_reader = new FileReader()

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

    let sentences = store.state.emotions_dataset;
    emotions = store.state.emotions;

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
    let outputs = generateOutputs(sentences, emotions);

    // Train model
    trainModel(sentences, vectors, outputs, emotions, allWords, wordReference);
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

/**
 * Loops through the sentences and matches all the emotions
 * from these with the provided emotions list
 * @param sentences List of sentences from the training set
 * @param emotions List of emotions from the training set
 * @returns Array of matched emotions arrays
 */
function generateOutputs(sentences, emotions) {
    return sentences.slice( 0, sentences.length ).map( s => {
        let s_tags = s.tag;
        let output = [];
        for( let i = 0; i < emotions.length; i++ ) {
            // TODO: Change tags to a dictionary to improve performance
            output.push( s_tags.includes( emotions[i] ) ? 1 : 0 );
        }
        return output;
    });
}

/**
 * Creates sequential model with adam optimizer algorithm and CategoricalCrossentropy loss
 * @param sentences
 * @param vectors
 * @param outputs
 * @param emotions
 * @param allWords
 * @param wordReference
 */
// eslint-disable-next-line no-unused-vars
function trainModel(sentences, vectors, outputs, emotions, allWords, wordReference) {
    // Define our model with several hidden layers
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 100, activation: "relu", inputShape: [allWords.length]}));
    model.add(tf.layers.dense({units: 50, activation: "relu"}));
    model.add(tf.layers.dense({units: 25, activation: "relu"}));
    model.add(tf.layers.dense({
        units: emotions.length,
        activation: "softmax"
    }));

    // Specify the training configuration
    // Use Adam algorithm optimizer
    // Computes the cross-entropy loss between the labels and predictions.
    // Calculates how often predictions equal labels.
    model.compile({
        optimizer: tf.train.adam(),
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"]
    });

    const xs = tf.stack(vectors.map(x => tf.tensor1d(x)));
    const ys = tf.stack(outputs.map(x => tf.tensor1d(x)));

    // Measure of how well a machine learning model generalizes data similar to that with which it was trained
    model.fit(xs, ys, {
        epochs: 50,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                // TODO: Logging visualizer and progression indicator
                console.log("Epoch #", epoch, logs);
            }
        }
    }).then(
        async () => {
            /*let i = 0;
            let trainingInterval = setInterval( async () => {
                let sentence = sentences[i].message;
                let s_tags = sentences[i].tag;

                // Generate vectors for sentences
                let vector = new Array( allWords.length ).fill( 0 );
                let words = sentence.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
                words.forEach( w => {
                    if( w in wordReference ) {
                        vector[ wordReference[ w ] ] = 1;
                    }
                });

                let prediction = await model.predict( tf.stack( [ tf.tensor1d( vector ) ] ) ).data();
                // Get the index of the highest value in the prediction
                let id = prediction.indexOf( Math.max( ...prediction ) );
                console.log( "Result: " + emotions[id] + ", Expected: " + s_tags[0]);

                i++;
                if (i === sentences.length) clearInterval(trainingInterval);
            }, 1000 );*/
            // TODO: Save to the file system within Electron app, Download model if using the browser
            // Store the trained model
            const settingsStore = useSettingsStore();
            const saveResults = await model.save('downloads://emotion_analysis');
            // Store AI related data to the application configuration file
            settingsStore.setSettings({
                key: 'ai.word_reference',
                value: wordReference
            });
            settingsStore.setSettings({
                key: 'ai.emotions',
                value: emotions
            });
            settingsStore.setSettings({
                key: 'ai.all_words',
                value: allWords
            });

            console.log(saveResults);
        }
    );

}

// TODO: Implement Singleton model
/**
 * Loads the Sequential AI tensorflow model from the user's specified
 * files and other emotion analysis required data
 * @param model_file JSON model meta-data file
 * @param weight_file Binary trained model weights file
 * @returns {Promise<void>}
 */
async function load_model(model_file, weight_file) {
    allWords = store.state.settings.ai.all_words;
    wordReference = store.state.settings.ai.word_reference;
    emotions = store.state.settings.ai.emotions;

    model = await tf.loadLayersModel(tf.io.browserFiles([model_file, weight_file]));
}

/**
 * Use pre-trained sequential model and detect the emotion
 * @param messages Array of Moodle messages
 * @returns {Promise<void>}
 */
async function analyze_emotion(messages) {
    for (const m of messages) {
        // Generate vectors for sentences
        let vector = new Array( allWords.length ).fill( 0 );
        let words = m.message.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
        words.forEach( w => {
            if( w in wordReference ) {
                vector[ wordReference[ w ] ] = 1;
            }
        });

        let prediction = await model.predict( tf.stack( [ tf.tensor1d( vector ) ] ) ).data();
        // Get the index of the highest value in the prediction
        let id = prediction.indexOf( Math.max( ...prediction ) );
        console.log( "Result: " + emotions[id]);

        m.emotion = emotions[id];
    }
}

export { load_emotions, train_ai, load_model, analyze_emotion }
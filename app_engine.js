/**
 * Summary. Code to parse and prepare text for TensorFlow.
 *
 * Description. This code process text (e.g., removing stop words, etc.), then breaks down the text into a useable dataset for use by dataProcessing.js
 *
 * @link   http://mytensorflowtest-env.pj6m2pd7jr.us-east-1.elasticbeanstalk.com/
 * @author Rob Garcia.
 */

/* global pluralize, FEATURE_LIST, ACRONYM_DATASET, stopWords, tf, ACRONYM_NUM_CLASSES, ACRONYM_CLASSES */

function appController() {
    // Get the text
    var context = document.getElementById('myText').value;
    if (context === "") {
        alert("Error: No text to process!");
    } else {
        // Remove stopwords and special characters and convert to an array
        var contextArray = removeStopWords(context);
        // Convert all the words to singular for better processing
        contextArray = convertToSingular(contextArray);
        // Map out the frequency of each word
        var frequencyMap = getFrequency(contextArray);
        // Convert to a 2D array and sort by occurence
        var sortedArray = convertToSortedArray(frequencyMap);
        // Get the number of times the most frequent word appears
        var arrayMax = Math.max.apply(Math, sortedArray.map(function (m) {
            return m[1];
        }));
        // Set the minimum to zero to allow all words in the text to be weighted
        var arrayMin = 0;
        // Prepare the HTML string. THE TABLE IS FLIPPED IN THE STYLESHEET TO LIST WORDS BY COLUMN
        var results = "<hr><p>2. Breakdown of words by frequency:</p><table class=\"tableByCol\"><tr>";
        /*
         * Add words to the table, sorted by frequency and in descending order
         * Display the word, the frequency and the frequency scaled between 1 and 0
         * Remember to replace the values of the frequency column with the scaled weights
         */
        rowsPerCol = parseInt(sortedArray.length / 3) + 1;
        for (var i = 0; i < sortedArray.length; i++) {
            // Scale the frequency value between 1 and 0
            var featureScaled = scaleFeature(sortedArray[i][1], arrayMin, arrayMax);
            // Add the three columns to the table
            results += "<td>" + sortedArray[i][0] + " x " + sortedArray[i][1] + " | (" + featureScaled.toFixed(3) + ")</td>";
            // Replace the frequency value with the scaled value
            sortedArray[i][1] = featureScaled;
            // Add a new column every 20 words
            if ((i + 1) % rowsPerCol === 0)
                results += "</tr><tr>";
        }
        // Close the table
        results += "</tr></table>";
        // Send the HTML string to the view
        document.getElementById('frequencyTable').innerHTML = results;
        // Resort by word
        sortedArray = sort2EArray(sortedArray, 0, 'DESC');
        // Create an array from the words column
        var textWordsArray = sortedArray.map(function (tuple) {
            return tuple[0];
        });
        // Create and array to hold the scaled weights
        var matchedArray = [];
        /* Iterate through FEATURE_LIST. If the word is present in the list, record
         * the weight in matchedArray. Otherwise, enter 0.0
         */
        for (var i = 0; i < FEATURE_LIST.length; i++) {
            var index = textWordsArray.indexOf(FEATURE_LIST[i]);
            if (index === -1) {
                matchedArray.push(0.0);
            } else {
                matchedArray.push(sortedArray[index][1]);
            }
        }
        // Display the results
        var dataResults = "<hr><p>3. Text content matched to dataset features with weights (scaled between 0 and 1):</p><table class=\"tableByCol\"><tr>";
        for (var i = 0; i < FEATURE_LIST.length; i++) {
            // Highlight if not zero
            var highlight = (matchedArray[i] !== 0 ? "<span class=\"highlight\">" : "<span>");
            dataResults += "<td>" + highlight + FEATURE_LIST[i] + " | " + matchedArray[i].toFixed(3) + "</span></td>";
            // Split the table into three columns
            if ((i + 1) % 51 === 0)
                dataResults += "</tr><tr>";
        }
        // Close the table
        dataResults += "</tr></table>";
        // Send the HTML string to the view
        document.getElementById('dataSetTable').innerHTML = dataResults;

        // The split is the amount of data you want for test. For example, .1 means use 90% of the data for training and 10% for training.    
        var theSplit = 0.2;
        var splitText = "<hr><p>4. The Split = " + theSplit + " (Using " + (100 - (theSplit * 100)) + "% of the dataset for training and " + (theSplit * 100) + "% for testing)" + "</p>";
        document.getElementById('splitText').innerHTML = splitText;

        var minConfidenceLevel = 0.5;
        var confidenceLevel = "<hr><p>5. Minimum confidence level = " + minConfidenceLevel + "</p>";
        document.getElementById('splitText').innerHTML = confidenceLevel;

        // Call asynchronous function doAcronyms 
        doAcronyms(theSplit, matchedArray, minConfidenceLevel);
    }
}

/**
 * 
 * @param {type} theSplit
 * @param {type} matchedArray
 * @param {type} confidenceLevel
 * @returns {undefined}
 */
async function doAcronyms(theSplit, matchedArray, confidenceLevel) {
    alert("Starting prediction process...\n\nPlease do not close this page unitl after the next alert box appears with your results.");
    console.log("The Split = " + theSplit + ", the matchedArray length = " + matchedArray.length + ", and the matchedArray's elements = " + matchedArray);
    const [xTrain, yTrain, xTest, yTest] = getAcronymData(theSplit);

    model = await trainModel(xTrain, yTrain, xTest, yTest);

    // tensor2d() requires shape to be provided when `values` are a flat/TypedArray 
    const input = tf.tensor2d([matchedArray], [1, matchedArray.length]);
    const prediction = model.predict(input);
    var resultArray = [];
    var confidenceLevelMet = false;
    for (var i = 0; i < ACRONYM_CLASSES.length; i++) {
        var p = prediction.dataSync()[i].toFixed(5);
        if (p >= confidenceLevel)
            confidenceLevelMet = true;
        resultArray[i] = p + ": " + ACRONYM_CLASSES[i] + "\n";
    }
    resultArray.sort();
    resultArray.reverse();

    var confidenceList = "<hr><p>6. Results (sorted by confidence):</p><table>";
    for (var i = 0; i < ACRONYM_CLASSES.length; i++) {
        confidenceList += "<tr><td>" + resultArray[i] + "</td></tr>";
    }
    confidenceList += "</table>";
    console.log("Results:\n" + resultArray);
    alert("Results:\n" + resultArray);
    if (confidenceLevelMet === false) {
        confidenceList += ("<p class=\"text-danger\">CONFIDENCE LEVEL (" + confidenceLevel + ") not met for any acronym in the dataset!</p>");
        console.log("WARNING: CONFIDENCE LEVEL (" + confidenceLevel + ") not met for any acronym in the dataset!\n");
        alert("WARNING: CONFIDENCE LEVEL (" + confidenceLevel + ") not met for any acronym in the dataset!\n");
    }
    document.getElementById('confidenceList').innerHTML = confidenceList;

    // Using ArgMax function to polarize values
    const predictionWithArgMax = model.predict(input).argMax(-1).dataSync();
    var acronymPrediction = "<hr><p>7. Prediction: <strong>" + ACRONYM_CLASSES[predictionWithArgMax] + "</strong></p>";
    document.getElementById('acronymPrediction').innerHTML = acronymPrediction;

    console.log("Prediction: " + ACRONYM_CLASSES[predictionWithArgMax]);

    alert("Prediction: " + ACRONYM_CLASSES[predictionWithArgMax]);
}

/**
 * Train a `tf.Model` to recognize Iris flower type.
 *
 * @param xTrain Training feature data, a `tf.Tensor` of shape
 *   [numTrainExamples, 4]. The second dimension include the features
 *   petal length, petalwidth, sepal length and sepal width.
 * @param yTrain One-hot training labels, a `tf.Tensor` of shape
 *   [numTrainExamples, 3].
 * @param xTest Test feature data, a `tf.Tensor` of shape [numTestExamples, 4].
 * @param yTest One-hot test labels, a `tf.Tensor` of shape
 *   [numTestExamples, 3].
 * @returns The trained `tf.Model` instance.
 */
async function trainModel(xTrain, yTrain, xTest, yTest) {
    const model = tf.sequential();
    // Set the learning rate    
    const learningRate = .01;
    // Set the number of iterations    
    const numberOfEpochs = 100;
    // See API for other optimizers: https://js.tensorflow.org/api/latest/
    const optimizer = tf.train.adam(learningRate);

    // Define the topology of the model: two dense layers.
    // Input layer. Using Sigmoid function for classification between 0 and 1
    // See API for other activation settings: https://js.tensorflow.org/api/latest/
    model.add(tf.layers.dense({
        units: ACRONYM_NUM_CLASSES,
        activation: 'sigmoid',
        inputShape: [xTrain.shape[1]]
    }));

    // Output layer. Softmax normalizes the results so the sum of all the units equals 1
    // See API for other activation settings: https://js.tensorflow.org/api/latest/
    model.add(tf.layers.dense({
        units: ACRONYM_NUM_CLASSES,
        activation: 'softmax'
    }));
    // model.summary();

    // See API for other loss and metric settings: https://js.tensorflow.org/api/latest/
    model.compile({
        optimizer: optimizer,
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    // alert("Here!");
    // Call `model.fit` to train the model.
    const history = await model.fit(xTrain, yTrain, {
        epochs: numberOfEpochs,
        validationData: [xTest, yTest],
        callbacks: {
            onEpochEnd: async (epoch, logs) => {
                console.log("Epoch: " + epoch + " Logs: " + logs.loss);
                await tf.nextFrame();
            }
        }
    });
    return model;
}

function removeStopWords(context) {
    // Convert the text to lowercase and replace all special characters with spaces
    context = context.toLowerCase().replace(/[^\w\s+]/gi, ' ');
    // Loop text, replacing stopwords with spaces duting each iteration
    for (var i = 0; i < stopWords.length; i++) {
        var re = new RegExp("\\b" + stopWords[i] + "\\b", 'gi');
        context = context.replace(re, ' ');
    }
    // Remove carriage returns and spaces from text
    context = context.replace(/\s+/g, ' ').trim();
    // Split text into an array and remove any empty elements
    contextArray = context.split(' ').filter(Boolean);
    return contextArray;
}

function convertToSingular(contextArray) {
    for (var i = 0; i < contextArray.length; i++) {
        // Convert to singular using Blake Embrey's awesome pluralize.js at https://github.com/blakeembrey/pluralize
        contextArray[i] = pluralize.singular(contextArray[i]);
    }
    return contextArray;
}

function getFrequency(contextArray) {
    var frequencyMap = {};
    contextArray.forEach(function (key) {
        if (frequencyMap.hasOwnProperty(key)) {
            frequencyMap[key]++;
        } else {
            frequencyMap[key] = 1;
        }
    });
    return frequencyMap;
}

function convertToSortedArray(frequencyMap) {
    // sort by count in descending order
    var sortedArray = [];
    for (var key in frequencyMap) {
        sortedArray.push([key, frequencyMap[key]]);
    }
    sortedArray = sort2EArray(sortedArray, 1, 'ASC');

    return sortedArray;
}

function sort2EArray(arrayToSort, column, order) {
    if (column < 0 || column > 1) {
        console.log("Error: Invalid column value.");
    } else {
        arrayToSort.sort(function (a, b) {
            // Sort by frequency in descending order. Change to a[0] and b[0] to sort by name
            if (a[column] === b[column]) {
                return 0;
            } else {
                if (order === 'ASC') {
                    return (a[column] > b[column]) ? -1 : 1;
                } else {
                    return (a[column] > b[column]) ? 1 : -1;
                }
            }
        });
    }
    return arrayToSort;
}

function scaleFeature(x, min, max) {
    return (x - min) / (max - min);
}
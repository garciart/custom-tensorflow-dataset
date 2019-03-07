/* global pluralize, FEATURE_LIST, ACRONYM_DATASET, stopWords, tf, ACRONYM_NUM_CLASSES */

/**
 * Summary. Code to parse and prepare text for TensorFlow.
 *
 * Description. This code process text (e.g., removing stop words, etc.), then breaksdown the text into a useable dataset for use by dataProcessing.js.
 *
 * @link   http://mytensorflowtest-env.pj6m2pd7jr.us-east-1.elasticbeanstalk.com/
 * @author Rob Garcia.
 */

function textPrepController() {
    // Get the text
    var context = document.getElementById('myText').value;
    // Remove stopwords and special characters and convert to an array
    var contextArray = removeStopWords(context);
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
    // Prepare the HTML string
    var results = "<hr><p>2. Breakdown of text by frequency:</p><table><tr>";
    /*
     * Add words to the table, sorted by frequency and in descending order
     * Display the word, the frequency and the frequency scaled between 1 and 0
     * Remember to replace the values of the frequency column with the scaled weights
     */
    for (var i = 0; i < sortedArray.length; i++) {
	// Scale the frequency value between 1 and 0
	var featureScaled = scaleFeature(sortedArray[i][1], arrayMin, arrayMax);
	// Add the three columns to the table
	results += "<td>" + sortedArray[i][0] + "</td><td>" + sortedArray[i][1] + "</td><td>(" + featureScaled.toFixed(3) + ")</td>";
	// Convert to singular using Blake Embrey's awesome pluralize.js at https://github.com/blakeembrey/pluralize
	sortedArray[i][0] = pluralize.singular(sortedArray[i][0]);
	// Replace the frequency value with the scaled value
	sortedArray[i][1] = featureScaled;
	// Split the table into three columns
	if ((i + 1) % 3 === 0)
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
    var dataResults = "<hr><p>3. Text data weights matched to training set features:</p><table><tr>";
    for (var i = 0; i < FEATURE_LIST.length; i++) {
	// Highlight if not zero
	var highlight = (matchedArray[i] !== 0 ? "<span class=\"highlight\">" : "<span>");
	dataResults += "<td>" + highlight + FEATURE_LIST[i] + "<span></td><td>" + highlight + matchedArray[i].toFixed(3) + "</span></td>";
	// Split the table into three columns
	if ((i + 1) % 3 === 0)
	    dataResults += "</tr><tr>";
    }
    // Close the table
    dataResults += "</tr></table>";
    // Send the HTML string to the view
    document.getElementById('dataSetTable').innerHTML = dataResults;

    // DON'T DO THIS!
    // Oops! Add data set identifier to end of matchedArray
    // Oops! matchedArray.push(0);
    // Oops! - Add matchedArray to data set
    // Oops! GO - ACRONYM_DATASET.push(matchedArray);

    // Display data sets in a table
    var weightsList = "<hr><p>4. Weights for training and test data:</p><table><tr>";
    for (var i = 0; i < ACRONYM_DATASET.length; i++) {
	for (var j = 0; j < ACRONYM_DATASET[i].length; j++) {
	    weightsList += "<td>" + ACRONYM_DATASET[i][j].toFixed(3) + "</td>";
	}
	weightsList += "</tr><tr>";
    }
    // Add the matchedArray
    for (var j = 0; j < matchedArray.length; j++) {
	weightsList += "<td><b>" + matchedArray[j].toFixed(3) + "</b></td>";
    }
    // Add an extra column since matchedArray does not have a target/class/y/label, etc.
    weightsList += "<td>???</td>";
    weightsList += "</tr><tr>";
    // Close the table
    weightsList += "</tr></table>";
    // Send the HTML string to the view
    document.getElementById('weightsList').innerHTML = weightsList;

    // The split is the amount of data you want for test. For example, .1 means use 90% of the data for training and 10% for training.    
    // BONUS! This actually updates the split each time you process text
    var theSplit = (1 / (ACRONYM_DATASET.length));
    var splitText = "<hr><p>5. The Split = " + theSplit + "</p>";
    document.getElementById('splitText').innerHTML = splitText;

    doAcronyms(theSplit, matchedArray);
}

async function doAcronyms(theSplit, matchedArray) {
    console.log("The Split = " + theSplit + ", matchedArray length = " + matchedArray.length + ", and matched array = " + matchedArray);
    const [xTrain, yTrain, xTest, yTest] = getAcronymData(theSplit);
    model = await trainModel(xTrain, yTrain, xTest, yTest);
    const input = tf.tensor2d([matchedArray], [1, matchedArray.length]);
    const prediction = model.predict(input);
    alert(prediction);
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
    const learningRate = .01;
    const numberOfEpochs = 40;
    const optimizer = tf.train.adam(learningRate);

    // Define the topology of the model: two dense layers.
    model.add(tf.layers.dense({
	units: 98,
	activation: 'sigmoid',
	inputShape: [xTrain.shape[1]]
    }));
    model.add(tf.layers.dense({
	units: ACRONYM_NUM_CLASSES,
	activation: 'softmax'
    }));
    model.summary();
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
    context = context.toLowerCase().replace(/[^\w\s+]/gi, '');
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
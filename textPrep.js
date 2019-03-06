/* global pluralize, FEATURE_LIST, ACRONYM_DATASET */

/**
 * Summary. Code to parse and prepare text for TensorFlow.
 *
 * Description. This code process text (e.g., removing stop words, etc.), then breaksdown the text into a useable dataset for use by dataProcessing.js.
 *
 * @link   http://mytensorflowtest-env.pj6m2pd7jr.us-east-1.elasticbeanstalk.com/
 * @author Rob Garcia.
 */

async function textPrepController() {
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
    
    // Add data set identifier to end of matchedArray
    matchedArray.push(ACRONYM_DATASET.length + 1);
    // Add matchedArray to data set
    ACRONYM_DATASET.push(matchedArray);
    
    // Display data sets in a table
    var weightsList = "<hr><p>4. Weights for training and test data:</p><table><tr>";
    for (var i = 0; i < ACRONYM_DATASET.length; i++) {
	for (var j = 0; j < ACRONYM_DATASET[i].length; j++) {
	    weightsList += "<td>" + ACRONYM_DATASET[i][j].toFixed(3) + "</td>";
	}
	weightsList += "</tr><tr>";
    }
    // Close the table
    weightsList += "</tr></table>";
    // Send the HTML string to the view
    document.getElementById('weightsList').innerHTML = weightsList;

    // BONUS! This actually updates the split each time you process text
    var theSplit = "<hr><p>5. The Split = " + (1 / (ACRONYM_DATASET.length)) + "</p>";
    document.getElementById('theSplit').innerHTML = theSplit;

    getAcronymData(theSplit);
}

function removeStopWords(context) {
    // Load stop words. Source: https://www.nltk.org/nltk_data/
    var stopWords = ["a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "couldn", "couldn't", "d", "did", "didn", "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't", "down", "during", "each", "e.g.", "few", "for", "from", "further", "had", "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven", "haven't", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i.e.", "i", "if", "in", "into", "is", "isn", "isn't", "it", "its", "it's", "itself", "just", "ll", "m", "ma", "me", "mightn", "mightn't", "more", "most", "mustn", "mustn't", "my", "myself", "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should", "shouldn", "shouldn't", "should've", "so", "some", "such", "t", "than", "that", "that'll", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "was", "wasn", "wasn't", "we", "were", "weren", "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn", "wouldn't", "y", "you", "you'd", "you'll", "your", "you're", "yours", "yourself", "yourselves", "you've"];
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
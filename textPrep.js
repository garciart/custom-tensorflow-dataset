/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @link   URL
 * @file   This files defines the MyClass class.
 * @author AuthorName.
 * @since  x.x.x
 */

// Feature names
const WORD_LIST = ['24', 'acquisition', 'angle', 'approach', 'assistance', 'astronaut', 'atmospheric', 'automated', 'cancelled', 'cascading', 'cassini', 'central processing unit', 'coarse', 'color', 'communications', 'component', 'computer', 'conferencing', 'configuration', 'connectivity', 'control', 'core', 'cpu', 'crew', 'customer', 'deliver', 'designed', 'email', 'encompassing', 'experiment', 'flight', 'font', 'hardware', 'hour', 'html', 'information', 'infrared', 'internet', 'LAN', 'landing', 'language', 'layout', 'major', 'management', 'maneuvering ', 'markup', 'measure', 'mode', 'module', 'network', 'one', 'operation', 'orbiter', 'organizational', 'page', 'position', 'presentation', 'provide', 'radiometer', 'ram', 'random access memory', 'relative', 'representative', 'saturn', 'section', 'segment', 'self', 'sensor', 'service', 'sheet', 'shuttle', 'simulator', 'solutions', 'sounder', 'space', 'spacecraft', 'spacelab', 'steering', 'stick', 'storage', 'stratosphere', 'stratospheric', 'style', 'sub', 'subsystem', 'sun', 'support', 'system', 'technology', 'telecommunications', 'temperature', 'three', 'titan', 'train', 'unit', 'user', 'voice', 'web'];

async function textPrepController() {
    // Get the text
    var context = document.getElementById('myText').value;
    // Remove stopwords and special characters and convert to a 2D array
    var contextArray = removeStopWords(context);
    var frequencyMap = getFrequency(contextArray);
    var sortedArray = convertToSortedArray(frequencyMap);
    var arrayMax = Math.max.apply(Math, sortedArray.map(function(m) {
	return m[1];
    }));
    // Setting minimum to zero allows all x's to be weighted
    var arrayMin = 0;
    var results = "<hr><p>Results:</p><table><tr>";
    for (var i = 0; i < sortedArray.length; i++) {
        var featureScaled = (sortedArray[i][1] - arrayMin) / (arrayMax - arrayMin);
        results += "<td>" + sortedArray[i][0] + "</td><td>" + sortedArray[i][1] + "</td><td>(" + featureScaled + ")</td>";
        sortedArray[i][1] = featureScaled;
        if((i + 1) % 3 === 0) results += "</tr><tr>";
    }
    results += "</tr></table>";
    document.getElementById('myTable').innerHTML = results;
    // Resort by word
    sortedArray = sort2EArray(sortedArray, 0, 'DESC');
    alert(sortedArray);
    var matchedArray = [];
    var count = 0;
    for (var i = 0; i < WORD_LIST.length; i++) {
        if (WORD_LIST[i] != sortedArray[count][0]) {
            matchedArray.push('0.0');
            count++;
        }
        else {
            matchedArray.push(sortedArray[count][1]);
        }
    }
    alert(matchedArray);

    var dataResults = "<hr><p>Data Results:</p><table><tr>";
    for (var i = 0; i < WORD_LIST.length; i++) {
	dataResults += "<td>" + WORD_LIST[i] + "</td><td>" + matchedArray[i] + "</td>";
        if((i + 1) % 3 === 0) dataResults += "</tr><tr>";
    }
    dataResults += "</tr></table>";

    document.getElementById('myDataTable').innerHTML = dataResults;
}

function removeStopWords(context) {
    // Load stop words. Source: https://www.nltk.org/nltk_data/
    var stopWords = ["a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "couldn", "couldn't", "d", "did", "didn", "didn't", "do", "does", "doesn", "doesn't", "doing", "don", "don't", "down", "during", "each", "e.g.", "few", "for", "from", "further", "had", "hadn", "hadn't", "has", "hasn", "hasn't", "have", "haven", "haven't", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i.e.", "i", "if", "in", "into", "is", "isn", "isn't", "it", "its", "it's", "itself", "just", "ll", "m", "ma", "me", "mightn", "mightn't", "more", "most", "mustn", "mustn't", "my", "myself", "needn", "needn't", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "shan't", "she", "she's", "should", "shouldn", "shouldn't", "should've", "so", "some", "such", "t", "than", "that", "that'll", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "was", "wasn", "wasn't", "we", "were", "weren", "weren't", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "won", "won't", "wouldn", "wouldn't", "y", "you", "you'd", "you'll", "your", "you're", "yours", "yourself", "yourselves", "you've"];
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

function getFrequency(contextArray) {
    var frequencyMap = {};
    contextArray.forEach(function(key) {
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
    if(column < 0 || column > 1) {
	Console.log("Error: Invalid column value.");
    }
    else {
        arrayToSort.sort(function (a, b) {
	    // Sort by frequency in descending order. Change to a[0] and b[0] to sort by name
	    if (a[column] === b[column]) {
		return 0;
	    } else {
		if(order === 'ASC') {
		    return (a[column] > b[column]) ? -1 : 1;
		}
		else {
		    return (a[column] > b[column]) ? 1 : -1;
		}
	    }
	});
    }
    

    return arrayToSort;
}

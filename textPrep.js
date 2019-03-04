/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

async function textPrepController() {
    // Get the text
    var context = document.getElementById('myText').value;
    var contextArray = removeStopWords(context);
    var frequencyMap = getFrequency(contextArray);
    var sortedArray = convertToSortedArray(frequencyMap);
    var results = "<hr><p>Results:</p><table><tr>";
    var arrayMax = sortedArray[0][1];
    // Setting minimum to zero allows all x's to be weighted
    var arrayMin = 0;
    for (var i = 0; i < sortedArray.length; i++) {
        var featureScaled = (sortedArray[i][1] - arrayMin) / (arrayMax - arrayMin);
        results += "<td>" + sortedArray[i][0] + "</td><td>" + featureScaled + "</td>";
        if(i % 3 === 0) results += "</tr><tr>";
        // results += "\n" + sortedArray[i].name + "\t" + sortedArray[i].count;
    }
    results += "</tr></table>";
    document.getElementById('myTable').innerHTML = results;
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

    sortedArray.sort(function (a, b) {
        // Sort by frequency in descending order. Change to a[0] and b[0] to sort by name
        if (a[1] === b[1]) {
            return 0;
        } else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    });

    return sortedArray;
}

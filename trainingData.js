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

/*
 * REMEMBER TO VISIT https://github.com/tensorflow/tfjs-examples/tree/master/iris
 */

/*
 * 
 * @type Array
 */
const ACRONYM_CLASSES =
        ['Cascading Style Sheet', 'Control Stick Steering', 'Computer Sub-System', 'Cassini Stratospheric Sounder', 'Coarse Sun Sensor', 'Core Segment Simulator', 'Customer Service System', 'Customer Self-Service', 'Communications Service Section'];

/*
 * 
 */
const ACRONYM_NUM_CLASSES = ACRONYM_CLASSES.length;

/*
 * 
 * @type Array
 */
const FEATURE_LIST = ['24', 'acquisition', 'angle', 'approach', 'assistance', 'astronaut', 'atmospheric', 'automated', 'canceled', 'cascading', 'cassini', 'central processing unit', 'coarse', 'color', 'communication', 'component', 'computer', 'conferencing', 'configuration', 'connectivity', 'control', 'core', 'cpu', 'crew', 'customer', 'deliver', 'designed', 'email', 'encompassing', 'experiment', 'flight', 'font', 'hardware', 'hour', 'html', 'information', 'infrared', 'internet', 'LAN', 'landing', 'language', 'layout', 'major', 'management', 'maneuvering ', 'markup', 'measure', 'mode', 'module', 'network', 'one', 'operation', 'orbiter', 'organizational', 'page', 'position', 'presentation', 'provide', 'radiometer', 'ram', 'random access memory', 'relative', 'representative', 'saturn', 'section', 'segment', 'self', 'sensor', 'service', 'sheet', 'shuttle', 'simulator', 'solution', 'sounder', 'space', 'spacecraft', 'spacelab', 'steering', 'stick', 'storage', 'stratosphere', 'stratospheric', 'style', 'sub', 'subsystem', 'sun', 'support', 'system', 'technology', 'telecommunication', 'temperature', 'three', 'titan', 'train', 'unit', 'user', 'voice', 'web'];

/*
 * Word data. The first 98 columns correspond to FEATURE_LIST, and the last column corresponding to ACRONYM_CLASSES.
 * @type Array
 */
const ACRONYM_DATA = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 1],
    [0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 1, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.75, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 4],
    [0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 1, 0.75, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [0.75, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 9]
];

/**
 * Convert Iris data arrays to 'tf.Tensor's.
 *
 * @param data The Iris input feature data, an `Array` of `Array`s, each element
 *   of which is assumed to be a length-4 `Array` (for petal length, petal
 *   width, sepal length, sepal width).
 * @param targets An `Array` of numbers, with values from the set {0, 1, 2}:
 *   representing the true category of the Iris flower. Assumed to have the same
 *   array length as `data`.
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 * @return A length-4 `Array`, with
 *   - training data as `tf.Tensor` of shape [numTrainExapmles, 4].
 *   - training one-hot labels as a `tf.Tensor` of shape [numTrainExamples, 3]
 *   - test data as `tf.Tensor` of shape [numTestExamples, 4].
 *   - test one-hot labels as a `tf.Tensor` of shape [numTestExamples, 3]
 */
function convertToTensors(data, targets, testSplit) {
    const numExamples = data.length;
    if (numExamples !== targets.length) {
        throw new Error('data and split have different numbers of examples');
    }

    // Randomly shuffle `data` and `targets`.
    const indices = [];
    for (let i = 0; i < numExamples; ++i) {
        indices.push(i);
    }
    tf.util.shuffle(indices);

    const shuffledData = [];
    const shuffledTargets = [];
    for (let i = 0; i < numExamples; ++i) {
        shuffledData.push(data[indices[i]]);
        shuffledTargets.push(targets[indices[i]]);
    }

    // Split the data into a training set and a tet set, based on `testSplit`.
    const numTestExamples = Math.round(numExamples * testSplit);
    const numTrainExamples = numExamples - numTestExamples;

    const xDims = shuffledData[0].length;

    // Create a 2D `tf.Tensor` to hold the feature data.
    const xs = tf.tensor2d(shuffledData, [numExamples, xDims]);

    // Create a 1D `tf.Tensor` to hold the labels, and convert the number label
    // from the set {0, 1, 2} into one-hot encoding (.e.g., 0 --> [1, 0, 0]).
    const ys = tf.oneHot(tf.tensor1d(shuffledTargets).toInt(), ACRONYM_NUM_CLASSES);

    // Split the data into training and test sets, using `slice`.
    const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
    const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
    const yTrain = ys.slice([0, 0], [numTrainExamples, ACRONYM_NUM_CLASSES]);
    const yTest = ys.slice([0, 0], [numTestExamples, ACRONYM_NUM_CLASSES]);
    return [xTrain, yTrain, xTest, yTest];
}

/**
 * Obtains Iris data, split into training and test sets.
 *
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 *
 * @param return A length-4 `Array`, with
 *   - training data as an `Array` of length-4 `Array` of numbers.
 *   - training labels as an `Array` of numbers, with the same length as the
 *     return training data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 *   - test data as an `Array` of length-4 `Array` of numbers.
 *   - test labels as an `Array` of numbers, with the same length as the
 *     return test data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 */
function getAcronymData(testSplit) {
    return tf.tidy(() => {
        const dataByClass = [];
        const targetsByClass = [];
        for (let i = 0; i < ACRONYM_CLASSES.length; ++i) {
            dataByClass.push([]);
            targetsByClass.push([]);
        }
        for (const example of ACRONYM_DATA) {
            const target = example[example.length - 1];
            const data = example.slice(0, example.length - 1);
            dataByClass[target].push(data);
            targetsByClass[target].push(target);
        }

        const xTrains = [];
        const yTrains = [];
        const xTests = [];
        const yTests = [];
        for (let i = 0; i < ACRONYM_CLASSES.length; ++i) {
            const [xTrain, yTrain, xTest, yTest] =
                    convertToTensors(dataByClass[i], targetsByClass[i], testSplit);
            xTrains.push(xTrain);
            yTrains.push(yTrain);
            xTests.push(xTest);
            yTests.push(yTest);
        }

        const concatAxis = 0;
        return [
            tf.concat(xTrains, concatAxis), tf.concat(yTrains, concatAxis),
            tf.concat(xTests, concatAxis), tf.concat(yTests, concatAxis)
        ];
    });
}
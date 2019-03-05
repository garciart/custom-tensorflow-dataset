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

import * as tf from '@tensorflow/tfjs';

export const CSS_ACRONYMS =
	['Cascading Style Sheet', 'Control Stick Steering', 'Computer Sub-System', 'Cassini Stratospheric Sounder', 'Coarse Sun Sensor', 'Core Segment Simulator', 'Customer Service System', 'Customer Self-Service', 'Communications Service Section'];

export const CSS_NUM_ACRONYMS = CSS_ACRONYMS.length;

/*
 * Word data. Columns correspond to the following features, with the last column corresponding to the labels listed above: 
 * 24 (1), acquisition (2), angle (3), approach (4), assistance (5), astronaut (6), atmospheric (7), automated (8), canceled (9), cascading (10), cassini (11), central processing unit (12), coarse (13), color (14), communications (15), component (16), computer (17), conferencing (18), configuration (19), connectivity (20), control (21), core (22), cpu (23), crew (24), customer (25), deliver (26), designed (27), email (28), encompassing (29), experiment (30), flight (31), font (32), hardware (33), hour (34), html (35), information (36), infrared (37), internet (38), LAN (39), landing (40), language (41), layout (42), major (43), management (44), maneuvering  (45), markup (46), measure (47), mode (48), module (49), network (50), one (51), operation (52), orbiter (53), organizational (54), page (55), position (56), presentation (57), provide (58), radiometer (59), ram (60), random access memory (61), relative (62), representative (63), saturn (64), section (65), segment (66), self (67), sensor (68), service (69), sheet (70), shuttle (71), simulator (72), solutions (73), sounder (74), space (75), spacecraft (76), spacelab (77), steering (78), stick (79), storage (80), stratosphere (81), stratospheric (82), style (83), sub (84), subsystem (85), sun (86), support (87), system (88), technology (89), telecommunications (90), temperature (91), three (92), titan (93), train (94), unit (95), user (96), voice (97), web (98)
 * @type Array
 */
const CSS_ACRONYMS_DATA = [
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
 * Convert Iris data arrays to `tf.Tensor`s.
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
    const ys = tf.oneHot(tf.tensor1d(shuffledTargets).toInt(), CSS_NUM_CLASSES);

    // Split the data into training and test sets, using `slice`.
    const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
    const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
    const yTrain = ys.slice([0, 0], [numTrainExamples, CSS_NUM_CLASSES]);
    const yTest = ys.slice([0, 0], [numTestExamples, CSS_NUM_CLASSES]);
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
export function getAcronymData(testSplit) {
    return tf.tidy(() => {
	const dataByClass = [];
	const targetsByClass = [];
	for (let i = 0; i < CSS_ACRONYMS.length; ++i) {
	    dataByClass.push([]);
	    targetsByClass.push([]);
	}
	for (const example of CSS_ACRONYMS_DATA) {
	    const target = example[example.length - 1];
	    const data = example.slice(0, example.length - 1);
	    dataByClass[target].push(data);
	    targetsByClass[target].push(target);
	}

	const xTrains = [];
	const yTrains = [];
	const xTests = [];
	const yTests = [];
	for (let i = 0; i < CSS_ACRONYMS.length; ++i) {
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
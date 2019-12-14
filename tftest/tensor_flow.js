/**
 * Summary. My First TensorFlow.js tutorial.
 *
 * Description. All comments are based on the information found at https://js.tensorflow.org/api or one of Laurence Moroney's excellent tutorials at Coding TensorFlow.
 *
 * @link   https://www.youtube.com/watch?v=pbCExciEbrc&list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx&index=21&t=0s
 * @author Laurence Moroney.
 */

/* global tf */

/**
 * Determines y value for x input, based on slope calculated from dataset xs and ys
 * 
 * @param x x values for a line
 */
async function learnLinear(x) {
    // A sequential model is any model where the outputs of one layer are the inputs to the next layer, i.e. the model topology is a simple 'stack' of layers, with no branching or skipping
    const model = tf.sequential();
    // Create a dense layer where each layer is fully connected to the other
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));
    // Configure and prepare the model for training and evaluation.
    model.compile({
        // Other loss functions include BinaryCrossentropy, CategoricalCrossentropy, etc.
        loss: 'meanSquaredError',
        // Using Stochastic Gradient Descent. Other optimizers include AdaDelta, AdaGrad, Adam, etc.
        optimizer: 'sgd'
    });
    // Tensors for training values. Example is a straight line with a slope of 2/1
    // Tensor with input values and shape [6 rows and 1 column]
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    // Tensor with output values and shape [6 rows and 1 column]
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    // Train the model for 500 iterations
    await model.fit(xs, ys, {epochs: 250});
    // Output result */
    document.getElementById('output_field').innerText = model.predict(
            tf.tensor2d([x], [1, 1])
            );
}
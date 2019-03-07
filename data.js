/**
 * Summary. Data for Tensorflow.js.
 *
 * @link   http://mytensorflowtest-env.pj6m2pd7jr.us-east-1.elasticbeanstalk.com/
 * @author Rob Garcia at rgarcia@rgprogramming.com.
 */

/*
 * The name of the y's, aka classes, targets, labels, output variable names
 * @type array
 */
ACRONYM_CLASSES = ['Cascading Style Sheet', 'Control Stick Steering', 'Computer Sub-System', 'Cassini Stratospheric Sounder', 'Coarse Sun Sensor', 'Core Segment Simulator', 'Customer Service System', 'Customer Self-Service', 'Communications Service Section', 'National Aeronautics and Space Administration'];

ACRONYM_NUM_CLASSES = ACRONYM_CLASSES.length;

/*
 * The name of the x's, aka features, input variable names
 * @type array
 */
FEATURE_LIST = ['24', 'acquisition', 'angle', 'approach', 'assistance', 'astronaut', 'atmospheric', 'automated', 'canceled', 'cascading', 'cassini', 'central processing unit', 'coarse', 'color', 'communication', 'component', 'computer', 'conferencing', 'configuration', 'connectivity', 'control', 'core', 'cpu', 'crew', 'customer', 'deliver', 'designed', 'email', 'encompassing', 'experiment', 'flight', 'font', 'hardware', 'hour', 'html', 'information', 'infrared', 'internet', 'LAN', 'landing', 'language', 'layout', 'major', 'management', 'maneuvering ', 'markup', 'measure', 'mode', 'module', 'network', 'one', 'operation', 'orbiter', 'organizational', 'page', 'position', 'presentation', 'provide', 'radiometer', 'ram', 'random access memory', 'relative', 'representative', 'saturn', 'section', 'segment', 'self', 'sensor', 'service', 'sheet', 'shuttle', 'simulator', 'solution', 'sounder', 'space', 'spacecraft', 'spacelab', 'steering', 'stick', 'storage', 'stratosphere', 'stratospheric', 'style', 'sub', 'subsystem', 'sun', 'support', 'system', 'technology', 'telecommunication', 'temperature', 'three', 'titan', 'train', 'unit', 'user', 'voice', 'web'];

/*
 * Labeled examples (theta0...thetaN, y). The first 98 columns correspond to FEATURE_LIST weights (thetas), and the last column corresponding to ACRONYM_CLASSES (y's).
 * @type array
 */
ACRONYM_DATASET = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0],
    [0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 1, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.75, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 3],
    [0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 1, 0.75, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    [0.75, 0, 0, 0, 0.75, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0.75, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.75, 0, 0.75, 0, 0, 0, 0, 0, 0, 0.75, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.250, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.125, 0, 0, 0, 0.125, 0, 0, 0, 0, 0, 0, 0, 0.125, 0, 0, 0, 0, 0, 0.125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.125, 0, 0.125, 0, 0, 0, 1.0, 0.125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.375, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
];
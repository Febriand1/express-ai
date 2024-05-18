const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const loadModel = async () => {
    try {
      const modelPath = path.resolve(__dirname, 'model-ai/model-output_dir_ws.h5');
      const model = await tf.loadLayersModel(`file://${modelPath}`);
      console.log('Model loaded successfully');
      return model;
    } catch (err) {
      console.error('Error loading model:', err);
    }
};

module.exports = loadModel;
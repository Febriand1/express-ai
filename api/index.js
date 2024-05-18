const express = require('express');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');
const helmet = require('helmet');
const loadModel = require('./app/model/loadModel');

const app = express();

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

app.post('/api/predict', async (req, res) => {
    try {
      const model = await loadModel();
      if (!model) {
        return res.status(500).json({ message: 'Model could not be loaded' });
      }
  
      const data = req.body.data;
      if (!Array.isArray(data)) {
        return res.status(400).json({ message: 'Invalid data format, expected an array' });
      }
  
      const tensorData = tf.tensor(data);
      const prediction = model.predict(tensorData);
      const result = prediction.arraySync();
      res.status(200).json({ result });
      
    } catch (err) {
      console.error('Error during prediction:', err);
      res.status(500).json({ message: 'Error predicting data' });
    }
  });
  
  // Welcome message
  app.get('/api/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
  });
  
  module.exports = app;
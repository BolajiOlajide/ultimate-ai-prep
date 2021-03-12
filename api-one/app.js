const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser')

const { getIntentRouter } = require('./routes');


const app = express();

app.use(morgan('combined'));
app.use(json());

app.get('/', (_, res) => {
  return res.json({ message: 'Api One is live!' });
});

app.post('/intent', getIntentRouter);

module.exports = app;

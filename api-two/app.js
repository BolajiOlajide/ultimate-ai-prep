const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser');

const db = require('./db');


const app = express();

db.connect();

app.use(morgan('combined'));
app.use(json());

app.get('/', (_, res) => {
  return res.json({ message: 'Api Two is live!' });
});

// app.post('/intent', getIntentRouter);

module.exports = app;

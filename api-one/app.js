const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

app.get('/', (_, res) => {
  return res.json({ message: 'Api One is live!' });
});

module.exports = app;

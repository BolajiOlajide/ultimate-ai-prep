const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser');
const validator = require('express-joi-validator');

const { getReply } = require('./routes');
const { getReplySchema } = require('./schema');


const app = express();

app.use(morgan('combined'));
app.use(json());

app.get('/', (_, res) => {
  return res.json({ message: 'Api One is live!' });
});

app.post('/reply', validator(getReplySchema), getReply);

// error handler
app.use((err, req, res, next) => {
  console.log("err > ", err.message);

  const errorCode = (err.isBoom ? 400 : 500);

  // This responds to the request
  return res.status(errorCode).json({
    status: 'error',
    message: err.message || 'An error occured.'
  });
});

module.exports = app;

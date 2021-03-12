const express = require('express');
const morgan = require('morgan');
const { json } = require('body-parser');
const validator = require('express-joi-validator');

const db = require('./db');
const {
  createReply,
  fetchReply,
  deleteReply
} = require('./routes');
const {
  createReplySchema,
  deleteReplySchema,
  getReplySchema
} = require('./schema');


const app = express();

db.connect();

app.use(morgan('combined'));
app.use(json());

app.get('/', (_, res) => {
  return res.json({ message: 'Api Two is live!' });
});

app.post('/reply', validator(getReplySchema), fetchReply);
app.post('/reply/create',validator(createReplySchema) , createReply);
app.delete('/reply/:replyId', validator(deleteReplySchema), deleteReply);

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

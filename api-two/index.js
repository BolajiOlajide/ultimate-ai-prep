const express = require('express');
const config = require('lazy-config');


const app = express();

app.get('/', (_, res) => {
  return res.json({ message: 'Api Two is live!' });
});

app.listen(config.app.port, (err) => {
  if (err) {
    console.log(`Error starting app.\n${err.message}`);
  } else {
    console.log(`Starting app on PORT ${config.app.port}`);
  }
});

const config = require('lazy-config');

const app = require('./app');


app.listen(config.app.port, (err) => {
  if (err) {
    console.log(`Error starting app.\n${err.message}`);
  } else {
    console.log(`Starting app on PORT ${config.app.port}`);
  }
});

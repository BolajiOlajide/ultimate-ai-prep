const supertest = require('supertest');

const app = require('../app');
const db = require('../db');


before(async () => {
  await db.connect();

  Object.assign(global, {
    ...global,
    request: supertest.agent(app.listen()),
    db
  })
});

after(async () => {
  global.request = null;
  global.db = null;

  await db.disconnect();
});

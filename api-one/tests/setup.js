const supertest = require('supertest');

const app = require('../app');


before(async () => {
  Object.assign(global, {
    ...global,
    request: supertest.agent(app.listen()),
  })
});

after(async () => {
  global.request = null;
});

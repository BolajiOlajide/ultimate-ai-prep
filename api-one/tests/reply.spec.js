const config = require('lazy-config');
const fetch = require('node-fetch');
const sinon = require('sinon');


const payload = {
  message: 'Hello, from the other side',
};

describe('#replies', () => {
  let client;

  before(() => {
    client = global.request;

    const intentUrl = `${config.intent.baseUrl}/intents`;
    const replyUrl = `${config.app.replyServerBaseUrl}/reply`;

    sinon.stub(fetch, 'Promise').returns(Promise.resolve({
      ok: true,
      json: () => ({
        // mocked response from ultimate AI api
        intents: [
          {
            confidence: 0.5,
            name: 'Greeting'
          }
        ],

        // mocked response from API 2
        data: 'Hello! How are you doing?'
      })
    }));
  });

  after(() => {
    fetch.Promise.restore();
  });

  it('should return an error if the message field isnt in the payload', async () => {
    const response = await client.post('/reply').send();

    response.status.should.equal(400);
    response.body.message.should.equal('child "body" fails because [child "message" fails because ["message" is required]]');
  });

  it('should return an error if the message field isnt in the payload', async () => {
    const response = await client
      .post('/reply')
      .send({ message: 1244 });

    response.status.should.equal(400);
    response.body.message.should.equal('child "body" fails because [child "message" fails because ["message" must be a string]]');
  });

  it('should return the response gotten from API 2', async () => {
    const response = await client.post('/reply').send(payload);

    response.status.should.equal(200);
    response.body.data.should.equal('Hello! How are you doing?');
  });

  it('should return an error if the response from the Ultimate_AI API isnt successful', async () => {
    fetch.Promise.restore();

    sinon.stub(fetch, 'Promise').returns(Promise.resolve({
      ok: false
    }));

    const response = await client.post('/reply').send(payload);

    response.status.should.equal(400);
    response.body.message.should.equal('An error occurred while fetching the intent.');
  });
});

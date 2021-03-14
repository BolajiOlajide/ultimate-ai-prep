const ObjectId = require('mongoose').Types.ObjectId;

const { Reply } = require('../models');

const sampleReply = {
  intent: 'sample intent' + Date.now(), // doing this so the intent is always unique
  response: 'Hello! I am a sample.'
};

describe('#replies', () => {
  let client, reply;

  before(async () => {
    client = global.request;
    db = global.db;
  });

  context('fetch reply for intent', () => {
    before(async () => {
      reply = new Reply(sampleReply);
      await reply.save();
    });

    after(async () => {
      await Reply.findByIdAndDelete(reply._id);
    });

    it('should return an error if confidence field isn\'t in the payload', async () => {
      const response = await client
        .post('/reply')
        .send();

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "confidence" fails because ["confidence" is required]]');
    });

    it('should return an error if confidence field isn\'t a number', async () => {
      const response = await client
        .post('/reply')
        .send({ confidence: 'confidence' });

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "confidence" fails because ["confidence" must be a number]]');
    });

    it('should return an error if name field isn\'t in the payload', async () => {
      const response = await client
        .post('/reply')
        .send({ confidence: 0.9303 });

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "name" fails because ["name" is required]]');
    });

    it('should return an error if name field isn\'t  a string', async () => {
      const response = await client
        .post('/reply')
        .send({ confidence: 0.9303, name: 22434 });

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "name" fails because ["name" must be a string]]');
    });

    it('should return an error if name field isn\'t  a string', async () => {
      const response = await client
        .post('/reply')
        .send({ confidence: 0.9303, name: 22434 });

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "name" fails because ["name" must be a string]]');
    });

    it('should return a response for the intent name passed', async () => {
      const response = await client
        .post('/reply')
        .send({ confidence: 0.9303, name: sampleReply.intent });

      response.status.should.equal(200);
      response.body.data.should.equal('Hello! I am a sample.');
    });
  });

  context('create replies', () => {
    after(async () => {
      await Reply.findByIdAndDelete(reply._id);
    });

    it('should return an error if intent field isn\'t in the payload', async () => {
      const response = await client
        .post('/reply/create')
        .send();

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "intent" fails because ["intent" is required]]');
    });

    it('should return an error if response field isn\'t in the payload', async () => {
      const response = await client
        .post('/reply/create')
        .send({ intent: 'insult' });

      response.status.should.equal(400);
      response.body.message.should.equal('child "body" fails because [child "response" fails because ["response" is required]]');
    });

    it('should save the reply into the database', async () => {
      const intent = 'insult' + Date.now();

      const response = await client
        .post('/reply/create')
        .send({
          intent,
          response: 'Hello! I am sorry'
        });

      response.status.should.equal(201);
      reply = response.body.data;
      response.body.status.should.equal('success');
      response.body.data.intent.should.equal(intent);

      const fetchedReply = await Reply.findById(reply._id);
      fetchedReply.intent.should.equal(intent);
    });
  });

  context('delete replies', () => {
    before(async () => {
      reply = new Reply(sampleReply);
      await reply.save();
    });

    it('should return a 404 if the reply doesnt exist', async () => {
      const randomObjectId = new ObjectId();
      const response = await client.delete(`/reply/${randomObjectId}`);

      response.status.should.equal(404);
      response.body.message.should.equal(`The reply with ID ${randomObjectId} does not exist.`);
    });

    it('should delete the reply from the database', async () => {
      const response = await client.delete(`/reply/${reply._id}`);

      response.status.should.equal(204);

      const deletedReply = await Reply.findById(reply._id);
      should.not.exist(deletedReply);
    });
  });
});

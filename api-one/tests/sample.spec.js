describe('sample', () => {
  let client;

  before(() => {
    client = global.request;
  });

  it('should display a text in the home route', async () => {
    const response = await client.get('/');

    response.body.message.should.equal('Api One is live!');
  });
});

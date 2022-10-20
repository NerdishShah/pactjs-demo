const path = require('path');
const Earth = require('../src/client');
const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
describe('Test', () => {
  // pact mock server url
  const mock_port = 1234;
  const mock_server_url = 'http://127.0.0.1:' + mock_port;
  // pact instance
  const provider = new PactV3({
    consumer: 'web_server',
    provider: 'api_server',
    port: mock_port,
    dir: path.resolve(process.cwd(), 'tests', 'pacts'),
  });
  it('test: getTotalPopulation', () => {
    // interaction
    provider
      .uponReceiving("a GET request to get total earth's population")
      .withRequest({
        method: 'GET',
        path: '/population',
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          population: MatchersV3.number(7794798739),
        },
      });
    return provider.executeTest(() => {
      const earth = new Earth(mock_server_url);
      return earth
        .getTotalPopulation()
        .then((res) => {
          expect(res.population).toBe(7794798739);
        })
        .catch((err) => {
          expect(err).toBeNull();
        });
    });
  });
});

const axios = require('axios');
function Earth(api_server_url) {
  this.AXIOS = axios.create({ baseURL: api_server_url });
  this.getTotalPopulation = function () {
    return this.AXIOS.get('/population').then((res) => res.data);
  };
}
module.exports = Earth;

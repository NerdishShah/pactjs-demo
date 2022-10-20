const express = require('express');
const app = express();
const port = 5000;
app.get('/population', (req, res) => {
  res.append('Content-Type', 'application/json').status(200).send({
    population: 123456789,
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

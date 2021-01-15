const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const axios = require('axios');

app.get('/', async (req, res) => {
  
  try {
    const result = await axios.get('http://169.254.169.254/latest/meta-data');
    res.json(result);
  } catch(e) {
    res.json(JSON.stringify(e));
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
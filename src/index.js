const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const axios = require('axios');

app.get('/', (req, res) => {
  // TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
  const result = axios.get(
    // 'http://169.254.169.254/latest/api/token',
      'http://169.254.169.254/latest/meta-data/instance-id',
      {},
      // { headers: { 'X-aws-ec2-metadata-token-ttl-seconds': 21600 }}
  )
  .then(result => res.json({ result }))
  .catch(error => res.json({ error }));
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
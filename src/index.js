const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
// const axios = require('axios');
const aws = require('aws-sdk');


app.get('/', async (req, res) => {
  // const result = axios.get(
  //   // 'http://169.254.169.254/latest/api/token',
  //   //   'http://169.254.169.254/latest/meta-data/instance-id',
  //     {},
  //     { headers: { 'X-aws-ec2-metadata-token-ttl-seconds': 21600 }}
  // )
  // .then(result => res.json({ result }))
  // .catch(error => res.json({ error }));

  // new aws.MetadataService().request('/latest/meta-data/', (err, data) => {
  //   res.json({ err, data });
  // });


  const result = await new aws.MetadataService().request('/latest/meta-data/');
  res.json({ result });
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
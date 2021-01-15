const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
// const axios = require('axios');
const aws = require('aws-sdk');


app.get('/', (req, res) => {
  const metadataService = new aws.MetadataService();

  metadataService.request('/latest/meta-data/', (err, data) => {
    if (err) {
      res.json({ err });
      return;
    }
    const metadata = data.split(/\r\r|\r|\n/);
    const ec2Metadata = {};

    metadata.forEach(item => {
      metadataService.request(`/latest/meta-data/${item}`, (err, data) => {
        if (err) {
          res.json({ err });
          return;
        }
        ec2Metadata[item] = data;
      })
    });

    res.json({ ec2Metadata });
  });






});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
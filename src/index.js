const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const { getMetaDataItems } = require('./metadata.service');
const aws = require('aws-sdk');


app.get('/', async (req, res) => {
  try {
    // const items = await getMetaDataItems();
    // const ec2Metadata = await getMetaData(items);


    new aws.MetadataService.request('/latest/meta-data/', (err, data) => {
      if (err) {
        res.json({ err });
      }

      const metadata = data.split(/\r\r|\r|\n/);
      res.json({ metadata });
    });

    // res.json({ items });
  } catch (error) {
    res.json({ error });
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
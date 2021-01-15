const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const { getMetaDataItems, getMetaData } = require('./metadata.service');


app.get('/', async (req, res) => {
  // const metadataService = new aws.MetadataService();
  //
  // metadataService.request('/latest/meta-data/', (err, data) => {
  //   if (err) {
  //     res.json({ err });
  //     return;
  //   }
  //   const metadata = data.split(/\r\r|\r|\n/);
  //   res.json({ metadata });
  // });

  try {
    const metadata = await getMetaDataItems();
    const ec2Metadata = await getMetaData(metadata);
    res.json({ ec2Metadata })
  } catch (error) {
    res.json({ error })
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
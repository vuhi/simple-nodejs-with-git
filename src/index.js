const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const { getMetaDataItems, getMetaData } = require('./metadata.service');


app.get('/', async (req, res) => {

  try {
    const metadata = await getMetaDataItems();
    const ec2Metadata = await getMetaData(metadata);
    res.json({ metadata, ec2Metadata })
  } catch (error) {
    res.json({ error })
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
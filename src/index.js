const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const { getMetaDataItems, getMetaData } = require('./metadata.service');



app.get('/', async (req, res) => {
  try {
    const items = await getMetaDataItems();
    const ec2Metadata = await getMetaData(items);
    res.json({ items });
  } catch (error) {
    res.json({ error });
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
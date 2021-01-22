const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const { getMetaDataItems, getMetaData } = require('./metadata.service');

app.get('/', (req, res) => {
  res.json({ message: 'this is a successful health check message from simple-nodejs app'});
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong'});
});

app.get('/metadata', async (req, res) => {
  try {
    const metadata = await getMetaDataItems();
    const ec2Metadata = await getMetaData(metadata);
    res.json({ metadata, ec2Metadata })

  } catch (error) {
    res.status(400).json({ error })
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = server;
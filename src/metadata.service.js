const aws = require('aws-sdk');
const metadataService = new aws.MetadataService();

const getMetaDataItems = () => new Promise((resolve, reject) => {    
  metadataService.request('/latest/meta-data/',
    // { headers: { 'x-aws-ec2-metadata-token': process.env.TOKEN }},
    (err, data) => {
    try {
      if (err) throw err;
      if (!data) throw new Error('no data receive');

      const metadata = data.split(/\r\r|\r|\n/);
      resolve(metadata);
    } catch(err) {
      reject(err);
    }
  });
});

const getMetaData = async (items) => {
  const ec2Metadata = {};

  const promises = items.map(item => new Promise((resolve, reject) => {
    metadataService.request(`/latest/meta-data/${item}`, (err, data) => {
      try {
        if (err) throw err;
        if (!data) throw new Error('no data receive');

        ec2Metadata[item] = data;
        resolve();
      } catch(err) {
        reject(err);
      }
    })
  }));

  await Promise.all(promises);
  return ec2Metadata;
};

module.exports = { getMetaDataItems, getMetaData };


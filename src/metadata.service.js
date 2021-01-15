const aws = require('aws-sdk');
const metadataService = new aws.MetadataService();

const getMetaDataItems = () => new Promise((resolve, reject) => {
    metadataService.request('/latest/meta-data/', (err, data) => {
        if (err) {
            reject(err);
        }
        const metadata = data.split(/\r\r|\r|\n/);
        resolve(metadata);
    });
});

const getMetaData = async (items) => {
    const ec2Metadata = {};

    const promises = items.map(item => new Promise((resolve, reject) => {
        metadataService.request(`/latest/meta-data/${item}`, (err, data) => {
            if (err) {
                reject(err);
            }
            ec2Metadata[item] = data;
            resolve();
        })
    }));

    await Promise.all(promises);
    return ec2Metadata;
};

module.exports = { getMetaDataItems, getMetaData };


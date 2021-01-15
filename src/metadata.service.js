const aws = require('aws-sdk');

const getMetaDataItems = () => new Promise((resolve, reject) => {

    new aws.MetadataService.request('/latest/meta-data/', (err, data) => {
        if (err) {
            reject(err);
        }

        const metadata = data.split(/\r\r|\r|\n/);
        resolve(metadata);
    });
});

const getMetaData = async (items) => {
    const ec2Metadata = {};

    const promises = items.forEach(item => new Promise((resolve, reject) => {
        new aws.MetadataService.request(`/latest/meta-data/${item}`, (err, data) => {
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

module.exports = { getMetaData, getMetaDataItems };




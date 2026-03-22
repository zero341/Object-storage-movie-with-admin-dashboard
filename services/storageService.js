// services/storageService.js

const AWS = require('aws-sdk');

// Configure AWS SDK for S3 / MinIO
const s3 = new AWS.S3({
    endpoint: 'your-minio-endpoint',  // Replace with your MinIO S3 endpoint
    accessKeyId: 'your-access-key',   // Replace with your access key
    secretAccessKey: 'your-secret-key', // Replace with your secret key
    s3ForcePathStyle: true, // Required for MinIO
});

// Function to upload a file to S3 / MinIO
const uploadFile = async (bucketName, key, fileContent) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
    };

    return s3.upload(params).promise();
};

// Function to download a file from S3 / MinIO
const downloadFile = async (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    return s3.getObject(params).createReadStream();
};

// Function to delete a file from S3 / MinIO
const deleteFile = async (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    return s3.deleteObject(params).promise();
};

module.exports = {
    uploadFile,
    downloadFile,
    deleteFile,
};

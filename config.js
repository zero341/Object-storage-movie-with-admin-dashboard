// config.js

module.exports = {
    aws: {
        accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
        secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
        region: 'YOUR_AWS_REGION',
        bucket: 'YOUR_BUCKET_NAME'
    },
    database: {
        host: 'YOUR_DATABASE_HOST',
        user: 'YOUR_DATABASE_USER',
        password: 'YOUR_DATABASE_PASSWORD',
        database: 'YOUR_DATABASE_NAME'
    },
    application: {
        port: 3000,
        env: 'development'
    }
};
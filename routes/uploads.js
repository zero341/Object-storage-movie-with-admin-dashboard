const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const router = express.Router();

// Google Cloud Storage client
const storage = new Storage();
const bucket = storage.bucket('your-bucket-name');

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Storing file in memory for resumable upload
});

// Upload endpoint for movies with resumable support
router.post('/upload', upload.single('movie'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({ resumable: true });

        blobStream.on('error', (err) => {
            res.status(500).send(err.message);
        });

        blobStream.on('finish', () => {
            res.status(200).send('File uploaded successfully.');
        });

        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
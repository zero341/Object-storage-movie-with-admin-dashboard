const mongoose = require('mongoose');

// Database connection setup
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    releaseDate: {
        type: Date,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
    },
    genre: {
        type: [String],
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
}, { timestamps: true });

// File Schema
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
    },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
const File = mongoose.model('File', fileSchema);

module.exports = { connectDB, Movie, File };
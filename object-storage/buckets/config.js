class ObjectStorageConfig {
    constructor() {
        this.buckets = {
            movies: [],
            posters: [],
            trailers: [],
            subtitles: []
        };
    }

    // Add a file to the specified bucket
    addFile(bucket, file) {
        if (this.buckets[bucket]) {
            this.buckets[bucket].push(file);
        } else {
            throw new Error(`Bucket ${bucket} does not exist.`);
        }
    }

    // Remove a file from the specified bucket
    removeFile(bucket, file) {
        if (this.buckets[bucket]) {
            this.buckets[bucket] = this.buckets[bucket].filter(item => item !== file);
        } else {
            throw new Error(`Bucket ${bucket} does not exist.`);
        }
    }

    // List files in the specified bucket
    listFiles(bucket) {
        if (this.buckets[bucket]) {
            return this.buckets[bucket];
        } else {
            throw new Error(`Bucket ${bucket} does not exist.`);
        }
    }

    // Clear all files in the specified bucket
    clearBucket(bucket) {
        if (this.buckets[bucket]) {
            this.buckets[bucket] = [];
        } else {
            throw new Error(`Bucket ${bucket} does not exist.`);
        }
    }
}

// Export the class for use in other modules
module.exports = ObjectStorageConfig;

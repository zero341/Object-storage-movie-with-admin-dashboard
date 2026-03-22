'use strict';

const { exec } = require('child_process');
const path = require('path');

// Define quality presets
const presets = {
    '1080p': { width: 1920, height: 1080, bitrate: '5000k' },
    '720p': { width: 1280, height: 720, bitrate: '2500k' },
    '480p': { width: 854, height: 480, bitrate: '1000k' },
};

function convertToHLS(inputFile, outputDir) {
    for (const [presetName, { width, height, bitrate }] of Object.entries(presets)) {
        const outputFile = path.join(outputDir, `${presetName}/output.m3u8`);
        const ffmpegCommand = `ffmpeg -i ${inputFile} -vf 
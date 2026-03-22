import React, { useState } from 'react';

const FileUploadComponent = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'YOUR_API_ENDPOINT_HERE', true);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log('File uploaded successfully');
                setProgress(0);
            } else {
                console.error('Upload failed');
            }
        };

        const formData = new FormData();
        formData.append('file', file);
        xhr.send(formData);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div>Progress: {progress}%</div>
        </div>
    );
};

export default FileUploadComponent;
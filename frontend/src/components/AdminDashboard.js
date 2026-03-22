import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '', poster: null });
    const [uploadProgress, setUploadProgress] = useState(0);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewMovie({ ...newMovie, poster: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in newMovie) {
            formData.append(key, newMovie[key]);
        }

        try {
            const response = await axios.post('/api/movies', formData, {
                onUploadProgress: (ProgressEvent) => {
                    const { loaded, total } = ProgressEvent;
                    setUploadProgress(Math.round((loaded / total) * 100));
                }
            });
            setNewMovie({ title: '', director: '', year: '', poster: null });
            fetchMovies();
            alert('Movie added successfully!');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Movie Title" value={newMovie.title} onChange={handleChange} required />
                <input type="text" name="director" placeholder="Director" value={newMovie.director} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Release Year" value={newMovie.year} onChange={handleChange} required />
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Add Movie</button>
            </form>
            <progress value={uploadProgress} max="100" />
            <h2>Movies List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
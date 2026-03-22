'use strict';

const express = require('express');
const router = express.Router();

// Mock movie data
let movies = [];

// Create a new movie
router.post('/', (req, res) => {
    const { title, director, year } = req.body;
    const newMovie = { id: movies.length + 1, title, director, year };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// Read all movies
router.get('/', (req, res) => {
    res.json(movies);
});

// Read a movie by ID
router.get('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');
    res.json(movie);
});

// Update a movie by ID
router.put('/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Movie not found');

    const { title, director, year } = req.body;
    movie.title = title;
    movie.director = director;
    movie.year = year;
    res.json(movie);
});

// Delete a movie by ID
router.delete('/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).send('Movie not found');

    movies.splice(movieIndex, 1);
    res.status(204).send();
});

module.exports = router;
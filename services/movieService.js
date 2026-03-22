class MovieService {
    constructor() {
        this.movies = [];
    }

    addMovie(movie) {
        this.movies.push(movie);
        return movie;
    }

    getMovies() {
        return this.movies;
    }

    getMovieById(id) {
        return this.movies.find(movie => movie.id === id);
    }

    updateMovie(id, updatedMovie) {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index !== -1) {
            this.movies[index] = { ...this.movies[index], ...updatedMovie };
            return this.movies[index];
        }
        return null;
    }

    deleteMovie(id) {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index !== -1) {
            return this.movies.splice(index, 1)[0];
        }
        return null;
    }
}

export default MovieService;
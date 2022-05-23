const movies = [];

exports.addMovie = (movieObj) => {
    movies.push( movieObj );
}

exports.listMovies = () => {
    return movies;
}
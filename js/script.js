const API_KEY = 'c9969067a3218ce43c4915860fb5a681';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
    }
}

function displayMovies(movies) {
    const gridTendances = document.querySelector('.grid-tendances');
    gridTendances.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        const popularity = Math.round(movie.popularity); // Arrondi la popularité

        movieElement.innerHTML = `
            <div class="movie-image">
                <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                <div class="popularity">${popularity}%</div>
            </div>
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average.toFixed(1)}</p>
        `;
        gridTendances.appendChild(movieElement);
    });
}

document.addEventListener('DOMContentLoaded', fetchTrendingMovies);

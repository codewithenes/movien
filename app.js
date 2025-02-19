const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?query=';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzgwNjNiYjY1YTJlNWMxMWZkZTVhODU2NGZlNGEyMCIsIm5iZiI6MTczOTk1NDcxNy4wMjcsInN1YiI6IjY3YjU5YTFjNjBiMThhNTY5OGRmYzZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Y12Kf0YXn7wZUwoMpIYQv9HtyO_MbQiAkyYkih5BtY';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function fetchMovies(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.results); // Gelen filmleri konsolda görüntüleyelim
        showMovies(data.results); // Filmleri ekrana bas
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query) {
        fetchMovies(`${SEARCH_API}${query}&api_key=${API_KEY}`);
    } else {
        fetchMovies(API_URL);
    }
});

// Sayfa yüklendiğinde popüler filmleri getir
fetchMovies(API_URL);

function showMovies(movies) {
    main.innerHTML = ""; // Hata düzeltilmiş

    movies.forEach((movie) => {
        const { title, poster_path, overview, vote_average } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <div class="movie">
                <img src="${poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/1280x720'}" 
                    alt="${title}" />
            
                <div class="movie-info">
                    <h3>${title}</h3>
                        <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
                </div>

                <div class="overview">
                    <h3>${title} <small>Overview</small></h3>
                    <p>${overview}</p>
                </div>
            </div>
        `;
        main.appendChild(movieEl); // `movie.appendChild` hatası düzeltilmiş
    });
}

function getClassByRate(vote) {
    if (vote > 8) {
        return "green";
    } else if (vote > 6.4) {
        return "yellow";
    } else {
        return "red";
    }
}

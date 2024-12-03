// Replace this with your actual TMDB API key
const apiKey = '4d82c4f1246aa4866c28aebe28486228';
const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';

// Function to fetch data (GET request)
async function fetchMovies() {
    try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display movie data dynamically
function displayMovies(movies) {
    const movieGrid = document.querySelector('.movie-grid');
    movieGrid.innerHTML = ''; // Clear existing content

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        const movieDescription = document.createElement('p');
        movieDescription.textContent = movie.overview;

        const moreInfoButton = document.createElement('button');
        moreInfoButton.classList.add('movie-button');
        moreInfoButton.textContent = 'More Info';
        moreInfoButton.addEventListener('click', () => showMovieDetails(movie.id));

        movieCard.append(movieImage, movieTitle, movieDescription, moreInfoButton);
        movieGrid.appendChild(movieCard);
    });
}

// Function to fetch movie details (GET request)
async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movieDetails = await response.json();
        alert(`Movie Details: ${movieDetails.title}\n${movieDetails.overview}`);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Example function to send data (POST request) - Not typically used for movie fetching, but could be for user actions
async function submitUserReview(movieId, reviewData) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        const result = await response.json();
        console.log('Review submitted:', result);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
}

// Fetch movies on page load
window.addEventListener('DOMContentLoaded', fetchMovies);

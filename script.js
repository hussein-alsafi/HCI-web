const apiKey = '4d82c4f1246aa4866c28aebe28486228';
const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';

async function fetchMovies() {
    try {
        const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    const movieGrid = document.querySelector('.movie-grid');
    movieGrid.innerHTML = ''; 

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
        moreInfoButton.textContent = 'Movie id';
        moreInfoButton.addEventListener('click', () => showMovieDetails(movie.id));

        movieCard.append(movieImage, movieTitle, movieDescription, moreInfoButton);
        movieGrid.appendChild(movieCard);
    });
}

async function showMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const movieDetails = await response.json();
        alert(`Movie Details: ${movieDetails.title}\n${movieDetails.id}`);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

async function submitUserReview(movieId, reviewContent) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: 'User',
                content: reviewContent,
            }),
        });
        const result = await response.json();
        alert('Review submitted successfully!');
        console.log('Review submitted:', result);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
}

async function handleReviewSubmission(event) {
    event.preventDefault();
    const movieId = document.getElementById('movieId').value;
    const reviewContent = document.getElementById('reviewContent').value;
    if (movieId && reviewContent) {
        await submitUserReview(movieId, reviewContent);
    } else {
        alert('Please fill in all fields!');
    }
}

if (document.getElementById('reviewForm')) {
    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmission);
}

// Fetch movies on page load
window.addEventListener('DOMContentLoaded', fetchMovies);

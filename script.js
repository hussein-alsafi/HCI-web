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
        movieDescription.textContent = `Rating: ${movie.vote_average}`;

        const moreInfoButton = document.createElement('button');
        moreInfoButton.classList.add('movie-button');
        moreInfoButton.textContent = 'More Info';
        moreInfoButton.addEventListener('click', () => {
            alert(`Movie ID: ${movie.id}`);
        });

        movieCard.append(movieImage, movieTitle, movieDescription, moreInfoButton);
        movieGrid.appendChild(movieCard);
    });
}

async function submitMovieRating(movieId, rating) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: rating,
            }),
        });
        const result = await response.json();
        if (result.status_code === 1 || result.status_code === 12) {
            alert('Rating submitted successfully!');
        } else {
            alert('Failed to submit rating!');
        }
    } catch (error) {
        console.error('Error submitting rating:', error);
    }
}

async function handleRatingSubmission(event) {
    event.preventDefault();
    const movieId = document.getElementById('movieId').value;
    const rating = parseFloat(document.getElementById('rating').value);
    if (movieId && rating >= 0.5 && rating <= 10) {
        await submitMovieRating(movieId, rating);
    } else {
        alert('Please provide a valid movie ID and rating (between 0.5 and 10)!');
    }
}

if (document.getElementById('ratingForm')) {
    document.getElementById('ratingForm').addEventListener('submit', handleRatingSubmission);
}

window.addEventListener('DOMContentLoaded', fetchMovies);

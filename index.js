const form = document.querySelector('form');

form.addEventListener("submit",(e)=>{
  e.preventDefault();
})


// Function to fetch movies from db.json
async function fetchMovies() {
  try {
      const response = await fetch('db.json');
      const data = await response.json();
      return data.movies || []; // Assuming 'movies' is the array containing movie data
  } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
  }
}

// Function to display movies
async function displayMovies() {
  const movies = await fetchMovies();
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Clear existing content

  movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');

      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      titleElement.classList.add('title');
      movieItem.appendChild(titleElement);

      const posterElement = document.createElement('img');
      posterElement.src = movie.poster;
      posterElement.alt = movie.title;
      movieItem.appendChild(posterElement);

      // Likes section
      const likesSection = document.createElement('div');
      likesSection.classList.add('likes-section');
      const likesCount = document.createElement('span');
      likesCount.textContent = `${movie.likes} likes`;
      likesCount.classList.add('likes');
      likesSection.appendChild(likesCount);
      const likeButton = document.createElement('button');
      likeButton.textContent = '♥';
      likeButton.classList.add('like-button');
      likeButton.addEventListener('click', () => {
          // Increment likes count and update UI
          movie.likes++;
          likesCount.textContent = `${movie.likes} likes`;
          const likeBtn = document.getElementById('like-button');
          likeBtn.style.backgroundColor= "red";
      });
      likesSection.appendChild(likeButton);
      movieItem.appendChild(likesSection);

      // Comments section
      const commentsList = document.createElement('ul');
      commentsList.classList.add('comments');
      movie.comments.forEach(comment => {
          const commentItem = document.createElement('li');
          commentItem.textContent = comment.content;
          commentsList.appendChild(commentItem);
      });
      movieItem.appendChild(commentsList);

      // Comment form
      const commentForm = document.createElement('form');
      commentForm.classList.add('comment-form');
      const commentInput = document.createElement('input');
      commentInput.classList.add('comment-input');
      commentInput.type = 'text';
      commentInput.name = 'comment';
      commentInput.placeholder = 'Comment...';
      const commentButton = document.createElement('button');
      commentButton.classList.add('comment-button');
      commentButton.type = 'submit';
      commentButton.textContent = 'Post';
      commentForm.appendChild(commentInput);
      commentForm.appendChild(commentButton);
      commentForm.addEventListener('submit', event => {
          event.preventDefault();
          const newCommentContent = commentInput.value.trim();
          if (newCommentContent) {
              // Add new comment to movie and update UI
              const newComment = { id: movie.comments.length + 1, content: newCommentContent };
              movie.comments.push(newComment);
              const newCommentItem = document.createElement('li');
              newCommentItem.textContent = newCommentContent;
              commentsList.appendChild(newCommentItem);
              commentInput.value = ''; // Clear input field
          }
      });
      movieItem.appendChild(commentForm);

      movieContainer.appendChild(movieItem);
  });
}

// Function to search movies by title
async function searchMovies() {
  const searchTerm = document.getElementById('movie-input').value.trim().toLowerCase();
  if (searchTerm === '') {
      displayMovies(); // If search term is empty, display all movies
      return;
  }
  const movies = await fetchMovies();
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
  const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Clear existing content
  if (filteredMovies.length === 0) {
      movieContainer.textContent = 'No movies found.';
      return;
  }
  filteredMovies.forEach(movie => {
      // Display filtered movies
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');

      const titleElement = document.createElement('h2');
      titleElement.textContent = movie.title;
      titleElement.classList.add('title');
      movieItem.appendChild(titleElement);

      const posterElement = document.createElement('img');
      posterElement.src = movie.poster;
      posterElement.alt = movie.title;
      movieItem.appendChild(posterElement);

      // Likes section
      const likesSection = document.createElement('div');
      likesSection.classList.add('likes-section');
      const likesCount = document.createElement('span');
      likesCount.textContent = `${movie.likes} likes`;
      likesCount.classList.add('likes');
      likesSection.appendChild(likesCount);
      const likeButton = document.createElement('button');
      likeButton.textContent = '♥';
      likeButton.classList.add('like-button');
      likeButton.addEventListener('click', () => {
          // Increment likes count and update UI
          movie.likes++;
          likesCount.textContent = `${movie.likes} likes`;
      });
      likesSection.appendChild(likeButton);
      movieItem.appendChild(likesSection);

      // Comments section
      const commentsList = document.createElement('ul');
      commentsList.classList.add('comments');
      movie.comments.forEach(comment => {
          const commentItem = document.createElement('li');
          commentItem.textContent = comment.content;
          commentsList.appendChild(commentItem);
      });
      movieItem.appendChild(commentsList);

      // Comment form
      const commentForm = document.createElement('form');
      commentForm.classList.add('comment-form');
      const commentInput = document.createElement('input');
      commentInput.classList.add('comment-input');
      commentInput.type = 'text';
      commentInput.name = 'comment';
      commentInput.placeholder = 'Comment...';
      const commentButton = document.createElement('button');
      commentButton.classList.add('comment-button');
      commentButton.type = 'submit';
      commentButton.textContent = 'Post';
      commentForm.appendChild(commentInput);
      commentForm.appendChild(commentButton);
      commentForm.addEventListener('submit', event => {
          event.preventDefault();
          const newCommentContent = commentInput.value.trim();
          if (newCommentContent) {
              // Add new comment to movie and update UI
              const newComment = { id: movie.comments.length + 1, content: newCommentContent };
              movie.comments.push(newComment);
              const newCommentItem = document.createElement('li');
              newCommentItem.textContent = newCommentContent;
              commentsList.appendChild(newCommentItem);
              commentInput.value = ''; // Clear input field
          }
      });
      movieItem.appendChild(commentForm);

      movieContainer.appendChild(movieItem);
  });
}
// function to display movies
async function showMovies (){
    const moviez = await fetchMovies();  
    const filteredMoviez = moviez.filter(item=> item.type== "movie");
    const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Clear existing content
  if (filteredMoviez.length === 0) {
    movieContainer.textContent = 'No movies found.';
    return;
}
filteredMoviez.forEach(movie => {
    // Display filtered movies
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;
    titleElement.classList.add('title');
    movieItem.appendChild(titleElement);

    const posterElement = document.createElement('img');
    posterElement.src = movie.poster;
    posterElement.alt = movie.title;
    movieItem.appendChild(posterElement);

    // Likes section
    const likesSection = document.createElement('div');
    likesSection.classList.add('likes-section');
    const likesCount = document.createElement('span');
    likesCount.textContent = `${movie.likes} likes`;
    likesCount.classList.add('likes');
    likesSection.appendChild(likesCount);
    const likeButton = document.createElement('button');
    likeButton.textContent = '♥';
    likeButton.classList.add('like-button');
    likeButton.addEventListener('click', () => {
        // Increment likes count and update UI
        movie.likes++;
        likesCount.textContent = `${movie.likes} likes`;
    });
    likesSection.appendChild(likeButton);
    movieItem.appendChild(likesSection);

    // Comments section
    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments');
    movie.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment.content;
        commentsList.appendChild(commentItem);
    });
    movieItem.appendChild(commentsList);

    // Comment form
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    commentInput.type = 'text';
    commentInput.name = 'comment';
    commentInput.placeholder = 'Comment...';
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-button');
    commentButton.type = 'submit';
    commentButton.textContent = 'Post';
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentForm.addEventListener('submit', event => {
        event.preventDefault();
        const newCommentContent = commentInput.value.trim();
        if (newCommentContent) {
            // Add new comment to movie and update UI
            const newComment = { id: movie.comments.length + 1, content: newCommentContent };
            movie.comments.push(newComment);
            const newCommentItem = document.createElement('li');
            newCommentItem.textContent = newCommentContent;
            commentsList.appendChild(newCommentItem);
            commentInput.value = ''; // Clear input field
        }
    });
    movieItem.appendChild(commentForm);

    movieContainer.appendChild(movieItem);
});
}
// Function to show series only
async function showSeries (){
    const moviez = await fetchMovies();  
    const series = moviez.filter(item=> item.type== "series");
    const movieContainer = document.querySelector('.movie-container');
  movieContainer.innerHTML = ''; // Clear existing content
  if (series.length === 0) {
    movieContainer.textContent = 'No movies found.';
    return;
}
series.forEach(movie => {
    // Display filtered movies
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.title;
    titleElement.classList.add('title');
    movieItem.appendChild(titleElement);

    const posterElement = document.createElement('img');
    posterElement.src = movie.poster;
    posterElement.alt = movie.title;
    movieItem.appendChild(posterElement);

    // Likes section
    const likesSection = document.createElement('div');
    likesSection.classList.add('likes-section');
    const likesCount = document.createElement('span');
    likesCount.textContent = `${movie.likes} likes`;
    likesCount.classList.add('likes');
    likesSection.appendChild(likesCount);
    const likeButton = document.createElement('button');
    likeButton.textContent = '♥';
    likeButton.classList.add('like-button');
    likeButton.addEventListener('click', () => {
        // Increment likes count and update UI
        movie.likes++;
        likesCount.textContent = `${movie.likes} likes`;
    });
    likesSection.appendChild(likeButton);
    movieItem.appendChild(likesSection);

    // Comments section
    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments');
    movie.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment.content;
        commentsList.appendChild(commentItem);
    });
    movieItem.appendChild(commentsList);

    // Comment form
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    commentInput.type = 'text';
    commentInput.name = 'comment';
    commentInput.placeholder = 'Comment...';
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-button');
    commentButton.type = 'submit';
    commentButton.textContent = 'Post';
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);
    commentForm.addEventListener('submit', event => {
        event.preventDefault();
        const newCommentContent = commentInput.value.trim();
        if (newCommentContent) {
            // Add new comment to movie and update UI
            const newComment = { id: movie.comments.length + 1, content: newCommentContent };
            movie.comments.push(newComment);
            const newCommentItem = document.createElement('li');
            newCommentItem.textContent = newCommentContent;
            commentsList.appendChild(newCommentItem);
            commentInput.value = ''; // Clear input field
        }
    });
    movieItem.appendChild(commentForm);

    movieContainer.appendChild(movieItem);
});
}

// Event listener for search button
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', searchMovies);

// Display all movies initially
displayMovies();


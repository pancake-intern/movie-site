async function getMovies() {
    const moviesList = document.querySelector(".moviesList");
    moviesList.classList.add("d-flex", "flex-wrap", "justify-content-center");

    const movies = await (await fetch('fakeAPI.json')).json();

    movies.map((movie) => {
        const moviesContainer = document.createElement("div");
        moviesContainer.classList.add(
            "bg-light",
            "rounded",
            "d-flex",
            "flex-column",
            "align-items-center",
            "p-3",
            "m-2",
            "movie-card" 
        );
        moviesContainer.style.width = "18%";

        
        moviesContainer.addEventListener("click", () => {
           
            window.location.href = `movie.html?title=${encodeURIComponent(movie.title)}`;
        });

        const poster = document.createElement('img');
        poster.src = movie.Poster;
        poster.style.height = "300px";
        poster.classList.add('img-fluid', 'rounded', 'mb-2');

        const title = document.createElement('p');
        title.textContent = `Title: ${movie.title}`;

        const year = document.createElement('p');
        year.textContent = `Year: ${movie.year}`;

        const genre = document.createElement('p');
        genre.textContent = `Genre: ${movie.genre}`;

        const actors = document.createElement('p');
        actors.textContent = `Actors: ${movie.actors}`;

        moviesContainer.appendChild(poster);
        moviesContainer.appendChild(title);
        moviesContainer.appendChild(year);
        moviesContainer.appendChild(genre);
        moviesContainer.appendChild(actors);

        moviesList.appendChild(moviesContainer);
    });
}

getMovies();

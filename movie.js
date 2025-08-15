(async () => {
  const params = new URLSearchParams(location.search);
  const titleParam = params.get('title');
  const moviedetail = document.getElementById('details');

  if (!titleParam) {
    moviedetail.innerHTML = '<div class="alert alert-warning">Başlık bulunamadı.</div>';
    return;
  }

  try {
    const movies = await (await fetch('fakeAPI.json')).json();
    const movie = movies.find(m => (m.title || '').toLowerCase() === decodeURIComponent(titleParam).toLowerCase());

    if (!movie) {
      moviedetail.innerHTML = `<div class="alert alert-warning">Film bulunamadı: ${titleParam}</div>`;
      return;
    }

    moviedetail.innerHTML = `
      <div class="d-flex flex-column flex-md-row gap-4 align-items-start">
        <img src="${movie.Poster}" alt="${movie.title}" class="img-fluid rounded" style="max-height:420px">
        <div>
          <h2>${movie.title}</h2>
          <p>Year: ${movie.year}</p>
          <p>Genre: ${movie.genre}</p>
          <p>Actors: ${movie.actors}</p>
          <p>Plot: ${movie.plot}</p>
          <p>IMDB: ${movie.imdbRating} (${movie.imdbVotes} votes)</p>
          <p>Type: ${movie.Type}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}/" class="btn btn-warning btn-lg mb-3">IMDb'ye Git</a>
        </div>
      </div>
      ${Array.isArray(movie.Images) && movie.Images.length ?`
      <hr />
      <h4>Gallery</h4>
      <div class="row g-3">
        ${movie.Images.map(src => `
          <div class="col-6 col-md-4 col-lg-3">
            <img src="${src}" alt="${movie.title}" class="img-fluid rounded">
          </div>
        `).join('')}
      </div>` : ''}
    `;
  } catch (e) {
    console.error(e);
    moviedetail.innerHTML = '<div class="alert alert-danger">Veri yüklenemedi.</div>';
  }
})();

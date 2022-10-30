const favLink = document.querySelector("[data-favorite-link]");
const cardBody2 = document.querySelector("[data-favorite-card]");

async function initialTokencheck() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const res = await fetch("http://localhost:3000/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  const user = await res.json();
  return user;
}

async function userFavoriteMovies() {
  const { user } = await initialTokencheck();

  const body = {
    username: user.username,
  };

  console.log(body);

  const res = await fetch("http://localhost:3000/movie/favoritmovies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  renderMovies(data);
}

function renderMovies(data) {
  console.log(data);
  const movieElement = data.data.map(
    (movie) => `
    <div class="card" style="width: 20rem">
    <img src="${movie.img}" class="card-img-top" alt="..."  height="400"  />
    <div class="card-body">
      <h5 class="title">${movie.name}</h5>
      <div class="card-but">
      <a href="${movie.imdb}" class="btn btn-primary"> <span class="material-symbols-sharp">
      movie_filter
      </span> </a>
     
      <button data-remove-favorite onclick="removeMovieTouser('${movie._id}')" class="btn btn-primary" type="button"><span class="material-symbols-sharp">
      delete
      </span></button>
      </div>
      </div>
  </div>
  `
  );

  cardBody2.innerHTML = movieElement.join("");
}

async function removeMovieTouser(movieid) {
  const { user } = await initialTokencheck();

  const body = {
    userid: user._id,
    movieid: movieid,
  };

  console.log(body);

  const res = await fetch("http://localhost:3000/movie/removemovietouser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  userFavoriteMovies();
}

favLink.addEventListener("click", userFavoriteMovies);

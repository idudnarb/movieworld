const cardBody = document.querySelector("[data-movie-card]");
const addTofav = document.querySelector("[data-add-favorite]");
const removeFromfav = document.querySelector("[data-remove-favorite]");

const searchButton = document.querySelector("[data-search-button]");
const inputSearch = document.querySelector("[data-input-search]");

const logoutBut = document.querySelector("[data-logout-link]");

const token = localStorage.getItem("token");

END_POINT = "http://localhost:3000/movie/";

//check localstorage return user data

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

//bring the movies general

async function getAllmovies() {
  const res = await fetch(END_POINT + "allmovies");
  const data = await res.json();
  if (!token) renderMovies(data);
  else getAllmovieswithfav(data);
}

function renderMovies(movies) {
  console.log(movies);
  const movieElement = movies.map(
    (movie) => `
      <div class="card" style="width: 20rem">
        <img src="${movie.img}" class="card-img-top" alt="..."  height="400"  />
        <div class="card-body">
          <h5 class="title">${movie.name}</h5>
          <div class="card-but">
          <a href="${movie.imdb}" class="btn btn-primary"> <span class="material-symbols-sharp">
          movie_filter
          </span> </a>
          
          </div>
          </div>
      </div>
      `
  );

  cardBody.innerHTML = movieElement.join("");
}

//favorites

async function getAllmovieswithfav(movies) {
  const user = await initialTokencheck();
  console.log(user.user.age);
  let imgBeforeclick, imgOnclick;

  const movieElement = movies.map((movie) => {
    if (user.user.favorits.includes(movie._id)) {
      imgBeforeclick = "./images/star.png";
      imgOnclick = "./images/unstar.png";

      return `
      <div class="card" style="width: 20rem">
        <img src="${movie.img}" class="card-img-top" alt="..."  height="400"  />
        <div class="card-body">
          <h5 class="title">${movie.name}</h5>
          <div class="card-but">
          <a href="${movie.imdb}" class="btn btn-primary"> <span class="material-symbols-sharp">
          movie_filter
          </span> </a>
      
          <img style="width: 18px; height:18px" src=${imgBeforeclick} alt="" onclick="removeMovieTouser('${movie._id}');getAllmovies()"></img>
          </div>
          </div>
        </div>
      
       

      `;
    } else {
      imgBeforeclick = "./images/unstar.png";
      imgOnclick = "./images/star.png";

      return `
      <div class="card" style="width: 20rem">
        <img src="${movie.img}" class="card-img-top" alt="..."  height="400"  />
        <div class="card-body">
          <h5 class="title">${movie.name}</h5>
          <div class="card-but">
          <a href="${movie.imdb}" class="btn btn-primary"> <span class="material-symbols-sharp">
          movie_filter
          </span> </a>
      
          <img style="width: 18px; height:18px" src=${imgBeforeclick} alt="" onclick="addmovieTouser('${movie._id}');getAllmovies()"></img>
          </div>
          </div>
        </div>
      
      

      `;
    }
  });
  cardBody.innerHTML = movieElement.join("");
}

//REMOVE MOVIE TO USER

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
  getAllmovies();
}

//ADD MOVIE TO USER

async function addmovieTouser(movieid) {
  const { user } = await initialTokencheck();

  const body = {
    userid: user._id,
    movieid: movieid,
  };

  console.log(body);

  const res = await fetch("http://localhost:3000/movie/addmovietouser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  getAllmovies();
}

//search a movie//

searchButton.onsubmit = (e) => {
  e.preventDefault();

  const body = {
    name: inputSearch.value,
  };

  fetch("http://localhost:3000/movie/searchmovie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => renderoneMovie(data));
};

function renderoneMovie(data) {
  console.log(data);

  const movieElement = `
  <div class="card" style="width: 20rem">
    <img src="${data.img}" class="card-img-top" alt="..."  height="400"  />
    <div class="card-body">
      <h5 class="title">${data.name}</h5>
      <div class="card-but">
      <a href="${data.imdb}" class="btn btn-primary"> <span class="material-symbols-sharp">
      movie_filter
      </span> </a>

      <button data-remove-favorite onclick="removeMovieTouser('${data._id}')" class="btn btn-primary" type="button"><span class="material-symbols-sharp">
      delete
      </span></button>
      </div>
      </div>
  </div>
  `;
  cardBody.innerHTML = movieElement;
}

function logOut() {
  localStorage.removeItem("token");
  location.reload();
}

logoutBut.addEventListener("click", logOut);

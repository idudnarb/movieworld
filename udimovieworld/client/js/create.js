const createBut = document.querySelector("[data-create-form]");
const inputImg = document.querySelector("[data-insrt-img]");
const inputReqmov = document.querySelector("[data-insrt-movie]");
const inputImdb = document.querySelector("[data-insrt-imdb]");
const msGenjoy = document.querySelector("[data-movie-msg]");

END_POINT = "http://localhost:3000/movie/";

createBut.onsubmit = (e) => {
  e.preventDefault();
  console.log("udi");

  const body = {
    img: inputImg.value,
    name: inputReqmov.value,
    imdb: inputImdb.value,
  };

  fetch(END_POINT + "createmovie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  msGenjoy.innerHTML = "enjoy!";
};

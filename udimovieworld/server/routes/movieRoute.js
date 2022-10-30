const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.get("/allmovies", movieController.movielist);

router.post("/createmovie", movieController.createmovie);

router.post("/addmovietouser", movieController.addmovietouser);

router.post("/removemovietouser", movieController.removemovietouser);

router.post("/favoritmovies", movieController.favoritmovies);

router.post("/searchmovie", movieController.searchmovie);

module.exports = router;

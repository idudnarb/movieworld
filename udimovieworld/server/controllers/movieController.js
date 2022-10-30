const Movie = require("../models/Movie");
const User = require("../models/User");
const AppError = require("../utils/AppError");

exports.createmovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    const errorMsg = Object.values(error.errors)[0];
    next(new AppError(errorMsg, 400));
  }
};

// get list in index page

exports.movielist = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    next(new AppError("Register failed", 400));
  }
};

//add movie/favorite to user

exports.addmovietouser = async (req, res) => {
  try {
    console.log(req.body.userid);
    const user = await User.findByIdAndUpdate(
      { _id: req.body.userid },
      { $push: { favorits: req.body.movieid } }
    );
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//remove movie/favorite to user

exports.removemovietouser = async (req, res) => {
  try {
    console.log(req.body.userid);
    const user = await User.findByIdAndUpdate(
      { _id: req.body.userid },
      { $pull: { favorits: req.body.movieid } }
    );
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//show favorite movies for user

exports.favoritmovies = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "favorits"
    );

    // console.log(user);

    const favMovies = user.favorits;

    console.log(favMovies);
    res.status(200).json({ success: true, data: favMovies });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//search a movie in navbar

exports.searchmovie = async (req, res) => {
  console.log("test4");
  console.log("body", req.body.name);

  const movieByName = await Movie.findOne({
    name: { $regex: new RegExp(req.body.name, "i") },
  });

  console.log(movieByName);

  res.json(movieByName || "movie not found");
};

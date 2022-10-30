const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  // _id: { type: String },
  img: String,
  name: { type: String, required: [true, "Please provide an Moviename"] },
  genre: String,
  rating: Number,
  PG: Number,
  imdb: String,
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;

const { Schema, model } = require("mongoose");
const validateEmail = require("../utils/validateEmail");
const bcrypt = require("bcrypt");

const MINIMUM_AGE = 5;
const MAXIMUM_AGE = 120;

const addressSchema = new Schema({
  country: { type: String, default: "Israel" },
  city: { type: String, default: "Tel Aviv" },
  street: { type: String },
  zipCode: { type: Number },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide an Username"],
    unique: [true, "Username is already exist"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    unique: [true, "Email is already exist"],
    validate: {
      validator: validateEmail,
      message: "Email is invalid",
    },
  },
  firstName: { type: String },
  lastName: { type: String },
  age: {
    type: Number,
    min: [MINIMUM_AGE, `Minimum age must be at least ${MINIMUM_AGE}`],
    max: [MAXIMUM_AGE, `Maximum age can't be more then ${MAXIMUM_AGE}`],
  },
  password: { type: String, required: [true, "Please provide a password"] },
  address: addressSchema,
  createAt: { type: Date, default: Date.now, immutable: true },
  favorits: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.passwordCorrect = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("User", userSchema);

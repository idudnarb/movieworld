const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function generateToken({ _id }) {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET);
}

exports.register = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const usernameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });
    if (usernameCheck !== null)
      return next(new AppError("Username already exists", 400));
    if (emailCheck !== null)
      return next(new AppError("Email already exists", 400));
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(new AppError("Register failed", 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      next(new AppError("Please provide username and password", 400));

    const user = await User.findOne({ username });

    if (!user) return next(new AppError("User doesn't exist", 404));

    if (!(await user.passwordCorrect(password)))
      return next(new AppError("Password doesn't match", 403));

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(new AppError("Something want wrong"));
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return next(new AppError("Provide a token", 400));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.password = undefined;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(new AppError("Something want wrong"));
  }
};

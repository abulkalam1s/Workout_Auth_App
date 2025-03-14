const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// For creating a token, so that user can get it during signup and use the token for login
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" }); //SECRET var is in .env file (SECRET jitna strong rahega utna hi hash-password strong banega but Jayda Lamba Hone Se time Jada Lagiga. Isliye iska value ham balance me dete hai)
};

// sign-up user CONTROLLER
const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  // using try-catch so that in case of any error we can catch it. (Because we are dealing with database there may arise some errors/issues)
  try {
    // calling the sign_up() from userModel Schema, where new user creation are handled
    const user = await User.sign_up(email, password); // Await the sign_up method

    //CREATE A TOKEN, by calling createToken() defined above
    const token = createToken(user._id);

    // console.log(email);
    res.status(200).json({ email, token }); // Send a success response
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send an error response
    // console.log("Hey hey");
  }
};

// loginUser CONTROLLER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.sign_in(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); ////////changed here
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signUpUser,
};

// -----------------


const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const { Schema, model } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// sign-up function
userSchema.statics.sign_up = async function (email, password) {
  // we can't use arrow function here because we are using 'this' keyword here (as we studid).

  // VALIDATION
  // Check if all fields are filled
  if (!email || !password) {
    console.log(
      "Dono me se kuch nahi hai <-- me userModel.js ke sign_up fn se aaya hu"
    );
    throw Error("All fields must be filled.");
  }

  // Check Email Validity
  if (!validator.isEmail(email)) {
    console.log("Invalid email issue");
    // agar valid email hai to 'true' return karega, .'. ! use for running only in false case when email is invalid
    throw Error("Email is not valid");
  }

  // Check strong Password Validity
  if (!validator.isStrongPassword(password)) {
    console.log("Week password issue");
    throw Error(
      "Weak password. Try using number, upperCase-lowerCase letters and special characters"
    );
  }

  // Check if user exists in the database (MongoDB)
  const exists = await this.findOne({ email });

  // If user already exists with the email, then we will not register the new user.
  if (exists) {
    console.log("User Pehli se exists Kar rha");
    throw Error("User already exists");
  }

  // For Password Encryption
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // If all validations are correct, then we will creates a new user
  const user = await this.create({ email, password: hashPassword });

  // Returns the new user (so that it can be used in the controller fn when signup route is called)
  return user;
};

// sign-in function
userSchema.statics.sign_in = async function (email, password) {
  // VALIDATION
  if (!email || !password) {
    console.log("Dono me se Kuch Kuch Nahi Hai");
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    console.log("User exists hi nahi kar rha");
    throw Error("Incorrect email");
  }

  // Decrypt the user password and compare with the user's entered password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = model("User", userSchema);

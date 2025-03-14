const express = require("express");
const { loginUser, signUpUser } = require("../controllers/userController");

const userRouter = express.Router();

// LOGIN
userRouter.post("/login", loginUser);

// REGISTER
userRouter.post("/signup", signUpUser);

module.exports = userRouter;

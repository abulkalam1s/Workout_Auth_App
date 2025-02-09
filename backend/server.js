const express = require("express");
const workoutsRoute = require("./routes/workoutsRoute");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config(); // .env file ke variables Node ke(global process module ke process obj) process.env me add ho jayenge

// initialize app
const app = express();
app.use(cors()); // handles cors issues

// middleware to attach body to req obj
app.use(express.json());

// middleware: for logging any incoming request before processing
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); // must give otherwise next middleware app.get will never executes
});

// Routes Middleware
app.use("/api/workouts", workoutsRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB database");

    // listen
    app.listen((port = process.env.PORT), () => {
      console.log("Server is listening at PORT: ", port);
    });
  })
  .catch((error) =>
    console.log({ error: error, messg: "Mongodb conn. err aa gya" })
  );

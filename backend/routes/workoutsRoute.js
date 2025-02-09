const express = require("express");
const router = express.Router();

const validateWorkout = require("../middleware/validateWorkout");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutsController");

// GET
router.get("/", getWorkouts);

// GET:id
router.get("/:id", getWorkout);

// // POST
router.post("/", validateWorkout, createWorkout); // validateWorkout - is a middleware

// DELETE:id
router.delete("/:id", deleteWorkout);

// PATCH:id
router.patch("/:id", updateWorkout);

module.exports = router;

const Workout = require("../models/workoutModel");
const validateWorkout = require("../middleware/validateWorkout");
const { default: mongoose } = require("mongoose");

// to get all workout
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    if (!workouts) {
      return res.status(404).json({ message: "No Workout" });
    }
    res.status(200).json({ workouts: workouts });
  } catch (err) {
    res.status(400).json({ myError: err.message });
  }
};

// to get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout doesn't exist" });
    }
    res.status(200).json({ workouts: workout });
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// to add a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // to keep track which field is missing, will get pushed here. So later alert for that input field will be generated.
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }

  if (emptyFields.length > 0) {
    // if emptyFields.length > 0, means some fields is missing .'. we will not go below code, will return from here only
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    const workout = new Workout({ title, reps, load }); // alt method: const workout = Workout.create({ title, reps, load });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// to remove a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }

  try {
    const delWorkoutObj = await Workout.deleteOne({ _id: id });
    if (!delWorkoutObj) {
      return res.status(404).json({ message: "That workout doesn't exists" });
    }
    res.status(201).json({ message: "Workout deleted", data: delWorkoutObj });
  } catch (err) {
    req.status(400).json({ myError: err.message });
  }
};

// to update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid Id" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    res.status(404).json("No such content!");
  }
  res.status(200).json({ message: "Workout updated", workout: workout });
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};

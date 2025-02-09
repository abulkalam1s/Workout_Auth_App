module.exports = function validateWorkout(req, res, next) {
  const { title, reps, load } = req.body;

  // Check which fields are missing and return specific error messages
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (reps === undefined || reps === null) {
    return res.status(400).json({ error: "Reps are required" });
  }
  if (load === undefined || load === null) {
    return res.status(400).json({ error: "Load is required" });
  }

  next(); // Proceed to the next middleware (i.e., route handler)
};

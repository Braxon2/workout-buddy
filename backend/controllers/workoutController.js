const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json({ message: "Workout deleted successfully" });
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { new: true }
  );
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json({ message: "Workout updated successfully" });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};

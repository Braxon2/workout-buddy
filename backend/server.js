require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutsRoutes = require("./routes/workouts");

const app = express();

//routes

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutsRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to db and listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

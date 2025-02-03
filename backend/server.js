require("dotenv").config();
const express = require("express");

const app = express();

//routes

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started on http://localhost:" + process.env.PORT);
});

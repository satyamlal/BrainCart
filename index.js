const express = require("express");
const app = express();
const port = 3000;

app.post("/user/signup", (req, res) => {
  res.json({
    message: "SignUp endpoint!",
  });
});

app.get("/user/signin", (req, res) => {
  res.json({
    message: "sign-in endpoint",
  });
});

app.get("/user/purchases", (req, res) => {
  res.json({
    message: "All my purchased courses!",
  });
});

app.post("/course/purchase", (req, res) => {
  res.json({
    message: "Buy this course!",
  });
});

app.get("/courses", (req, res) => {
  res.json({
    message: "All the courses here!",
  });
});

app.listen(port, () => {
  console.log(`Server is listening to Port {port}`);
});

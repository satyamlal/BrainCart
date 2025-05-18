const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "Buy this course!",
  });
});

courseRouter.get("/preview", (req, res) => {
  res.json({
    message: "All the course Preview here!",
  });
});

module.exports = {
  courseRouter: courseRouter,
};

const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/course/purchase", (req, res) => {
  res.json({
    message: "Buy this course!",
  });
});

courseRouter.get("/course/preview", (req, res) => {
  res.json({
    message: "All the courses here!",
  });
});

module.exports = {
  courseRouter: courseRouter,
};

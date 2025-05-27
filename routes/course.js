const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("./db");

courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "Buy this course!",
  });
});

courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .select("title description price imageUrl");

    res.status(200).json({
      message: "All available couses!",
    });
  } catch (error) {
    console.log("Error fetching courses!", error);
    res.status(500).json({
      message: "Internal server error in fetching all courses!",
    });
  }
});

module.exports = {
  courseRouter: courseRouter,
};

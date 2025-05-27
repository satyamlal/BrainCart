const { Router } = require("express");
const courseRouter = Router();
const { courseModel } = require("./db");
const { purchaseModel } = require("../db");

courseRouter.post("/purchase", async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  try {
    await purchaseModel.create({
      userId,
      courseId,
    });

    res.json({
      message: "You successfully bought this course!",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: `Error while buying this course! ${error}`,
    });
  }
});

courseRouter.get("/preview", async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .select("title description price imageUrl");

    res.status(200).json({
      message: "All available couses!",
      courses,
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

function createCourseRoutes(app) {
  app.post("/course/purchase", (req, res) => {
    res.json({
      message: "Buy this course!",
    });
  });

  app.get("/course/preview", (req, res) => {
    res.json({
      message: "All the courses here!",
    });
  });
}

module.exports = {
  createCourseRoutes: createCourseRoutes,
};

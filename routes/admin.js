const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/login", (req, res) => {
  res.json({
    message: "Admin login Page!",
  });
});

adminRouter.post("/signup", (req, res) => {
  res.json({
    message: "Admin signup page!",
  });
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "Admin can create courses here!",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "Admin can change the name, price or image of the course here!",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message:
      "This page will show all the courses to the Admin that the Admin has created.",
  });
});
 
module.exports = { adminRouter: adminRouter };

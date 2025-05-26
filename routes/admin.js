// require("dotenv").config({ path: "../config.env" });

const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/admin");

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const existingAdmin = await adminModel.findOne({
    email: email,
  });

  if (existingAdmin) {
    return res.status(409).json({
      message: "Admin already exists!",
    });
  }

  await adminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.json({
    message: "Admin signup succeeded!",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // TODO : ideally password should be hashed, and hence you can't compare the user provided password and the database password
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    // Do cookie logic here

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid Admin Credentials!",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created successfully!",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, price, imageUrl, courseId } = req.body;

  const checkCourse = await courseModel.findById({ courseId });

  if (!checkCourse) {
    return res.status(404).json({
      message: "Course not found!",
    });
  }

  if (checkCourse.creatorId.toString() !== adminId) {
    return res.status(403).json({
      message: "Not authorized to update this course!",
    });
  }

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description,
      price,
      imageUrl: imageUrl,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Course Updated for ${adminId}`,
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const userId = req.userId;

  const course = await courseModel.find({
    courseId: userId,
  });

  res.json({
    message: "Your Courses!",
    course,
  });
});

module.exports = { adminRouter: adminRouter };

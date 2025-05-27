// require("./dotenv").config({ path: "../config.env" });

const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { userMiddleware } = require("../middleware/user");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body; // TODO : adding zod validation
  // TODO : hash the password so that plain text password isn't stored in the DB

  // TODO : put the below code inside a try-catch block
  await userModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.json({
    message: "SignUp succeeded!",
  });
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // TODO : ideally password should be hashed, and hence you can't compare the user provided password and the database password
  const user = await userModel.findOne({
    email,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    // Do cookie logic here

    // currently we are doing token based authentication, which is why we will send res.json()
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect User Credentials!",
    });
  }
});

userRouter.get("/preview", userMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({ userId });

    const courseIds = purchases.map((p) => p.courseId);

    const courses = await courseModel.find({
      _id: { $in: courseIds },
    });

    res.status(200).json({
      message: "You bought these courses!",
    });
  } catch (error) {
    console.log("Error fetching purchases courses", err);
    res.status(500).json({
      message: "Internal server error in fetching purchased courses!",
    });
  }
});

userRouter.get("/preview/:courseId", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const courseId = req.params.courseId;

  const purchase = await purchaseModel.findOne({
    userId,
    courseId,
  });

  if (!purchase) {
    return res.status(403).json({
      message: "Add this course to your cart!",
    });
  }

  res.status(200).json({ message: "Here is your course: ", course });
});

//This route fetches a list of all courses the logged-in user has already purchased.
userRouter.get("/purchase", userMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({
      userId,
    });

    const purchasedCourseIds = purchases.map((p) => p.courseId);

    const coursesData = await courseModel.find({
      _id: {
        $in: purchasedCourseIds,
      },
    });

    res.json({
      purchases,
      coursesData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error finding your courses!",
    });
  }
});

// This route lets a user purchase a course (simulates a buy action).
userRouter.post("/purchases", userMiddleware, async (req, res) => {
  // you would expect the user to pay you money
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    const purchasedCourses = await purchaseModel.findOne({
      userId,
      courseId,
    });

    if (purchasedCourses) {
      return res.status(400).json({
        message: "You already bought this course!",
      });
    }

    // Create a new course if not already bought
    await purchaseModel.create({
      userId,
      courseId,
    });

    res.json({
      message: "You bought a new course!",
    });
  } catch (err) {
    console.log("Error purchasing course!");
    res.status(500).json({
      message: "Internal server error while buying a new course!",
    });
  }
});

module.exports = {
  userRouter: userRouter,
};

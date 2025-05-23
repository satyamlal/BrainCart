const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "123123";

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

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "All my purchased courses!",
  });
});

module.exports = {
  userRouter: userRouter,
};

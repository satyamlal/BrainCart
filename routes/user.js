const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aslkjfsdl23424";

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
  const user = await userModel.find({ email, password });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );

    // currently we are doing token based authentication, which is why we will send res.json()
    res.json({
      token: token,
    });
  } else {
    res.json({
      message: "Incorrect Credentials!",
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

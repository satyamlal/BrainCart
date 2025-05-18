const { Router } = require("express");
const userRouter = Router();

userRouter.post("/user/signup", (req, res) => {
  res.json({
    message: "SignUp endpoint!",
  });
});

userRouter.post("/user/signin", (req, res) => {
  res.json({
    message: "sign-in endpoint",
  });
});

userRouter.get("/user/purchases", (req, res) => {
  res.json({
    message: "All my purchased courses!",
  });
});

module.exports = {
  userRouter: userRouter,
};

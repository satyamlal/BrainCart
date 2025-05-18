function createUserRoutes(app) {
  app.post("/user/signup", (req, res) => {
    res.json({
      message: "SignUp endpoint!",
    });
  });

  app.post("/user/signin", (req, res) => {
    res.json({
      message: "sign-in endpoint",
    });
  });

  app.get("/user/purchases", (req, res) => {
    res.json({
      message: "All my purchased courses!",
    });
  });
}

module.exports = {
  createUserRoutes: createUserRoutes,
};

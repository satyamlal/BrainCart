const express = require("express");
const app = express();
const port = 3000;
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");

app.use("/user", userRouter);
app.use("/course", courseRouter);

createUserRoutes(app);
createCourseRoutes(app);

app.listen(port, () => {
  console.log(`Server is listening to Port {port}`);
});

const express = require("express");
const app = express();
const port = 3000;
const { createUserRoutes } = require("./routes/user");
const { createCourseRoutes } = require("./routes/course");

createUserRoutes(app);
createCourseRoutes(app);

app.listen(port, () => {
  console.log(`Server is listening to Port {port}`);
});

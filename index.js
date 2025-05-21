const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
const port = 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

async function main() {
  await mongoose.connect(
    "mongodb+srv://ssatyamlal:RKJXGKJVRMok4cCx@cluster0-coursesellinga.sasqe7z.mongodb.net/coursera-app"
  );

  app.listen(port, () => {
    console.log(`Server is listening to Port ${port}`);
  });
}

main();

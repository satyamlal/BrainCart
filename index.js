require("dotenv").config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.get("/", (req, res) => {
  res.send("This is the home page!");
});

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`Server is listening to Port ${port}`);
    });
  } catch (err) {
    console.log("❌ Database connection failed!");
    console.log(err);
    process.exit(1);
  }
}

main();

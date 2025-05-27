const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  creatorId: ObjectId,
  //creatorId field refers to an entry in adminSchema. If there is an entry in the adminSchema with some Id(example - Id : 123 ) then only there will be a course here in this Schema with the same objectId (123) in this Schema.
  //You can't have a creatorId in this Schema that doesn't already exists in the adminSchema, only the admin is able to create any course, so you can't have a random objectId in the Schema for the creatorId.
});

const purchaseSchema = new Schema({
  userId: ObjectId, //userId is pointing to the userSchema
  courseId: ObjectId, //courseId is pointing to the courseSchema
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};

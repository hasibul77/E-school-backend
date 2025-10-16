import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String,
  order: Number
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessons: [lessonSchema],
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  price: Number,
  fileUrl: String,
  coverImage: String
});

export default mongoose.model("Book", bookSchema);

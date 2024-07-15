import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  fit: {
    type: String,
    enum: ["tight", "good", "loose", "perfect"],
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;

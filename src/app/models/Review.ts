import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const reviewSchema = new Schema({
  id: { type: String, required: true, unique: true },
  bookId: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  title: { type: String },
  comment: { type: String },
  timestamp: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
});

const Review = models.Review || model("Review", reviewSchema);
export default Review;
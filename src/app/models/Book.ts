// src/app/models/Book.js
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const bookSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  isbn: { type: String },
  genre: { type: [String] },
  tags: { type: [String] },
  datePublished: { type: String },
  pages: { type: Number },
  language: { type: String },
  publisher: { type: String },
  rating: { type: Number },
  reviewCount: { type: Number },
  inStock: { type: Boolean },
  featured: { type: Boolean },
});

const Book = models.Book || model("Book", bookSchema);
export default Book;

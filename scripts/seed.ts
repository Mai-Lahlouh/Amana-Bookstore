// scripts/seed.js
import 'dotenv/config';

import { connectDB } from "../src/app/lib/mongodb.js";
import Book from "../src/app/models/Book.js";
import Review from "../src/app/models/Review.js";
import { books } from "../src/app/data/books.js";
import { reviews } from "../src/app/data/reviews.js";


async function seed() {
  try {
    await connectDB();

    console.log("🧹 Clearing old data...");
    await Book.deleteMany({});
    await Review.deleteMany({});

    console.log("📚 Inserting books...");
    await Book.insertMany(books);

    console.log("💬 Inserting reviews...");
    await Review.insertMany(reviews);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();

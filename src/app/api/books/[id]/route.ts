// src/app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Book from "../../../models/Book";
import Review from "../../../models/Review";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    await connectDB();

    const book = await Book.findOne({ id }).lean();
    const reviews = await Review.find({ bookId: id }).lean();

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book, reviews });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}

// src/app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Book from "../../../models/Book";
import Review from "../../../models/Review";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // get [id] from the path

  if (!id)
    return NextResponse.json({ error: "Book id missing" }, { status: 400 });

  await connectDB();

  const book = await Book.findOne({ id }).lean();
  const reviews = await Review.find({ bookId: id }).lean();

  if (!book)
    return NextResponse.json({ error: "Book not found" }, { status: 404 });

  return NextResponse.json({ book, reviews });
}

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse>{
//   const id = params.id;

//   try {
//     await connectDB();

//     const book = await Book.findOne({ id }).lean();
//     const reviews = await Review.find({ bookId: id }).lean();

//     if (!book) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     return NextResponse.json({ book, reviews });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
//   }
// }

// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import BookGrid from "./components/BookGrid";
import { Book } from "./types";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const result = await res.json();

        // Your API wraps books in data
        setBooks(result.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (bookId: string) => {
    const storedCart = localStorage.getItem("cart");
    const cart: { bookId: string; quantity: number; addedAt: string }[] =
      storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cart.find((item) => item.bookId === bookId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ bookId, quantity: 1, addedAt: new Date().toISOString() });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="text-center bg-blue-100 p-8 rounded-lg mb-12 shadow-md">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
          Welcome to the Amana Bookstore!
        </h1>
        <p className="text-lg text-gray-600">
          Your one-stop shop for the best books. Discover new worlds and
          adventures.
        </p>
      </section>

      {/* Book Grid */}
      <BookGrid books={books} onAddToCart={handleAddToCart} />
    </div>
  );
}

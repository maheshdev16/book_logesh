const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let books = [
  { id: 101, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 102, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// Add new book
app.post("/books", (req, res) => {
  const { id, title, author } = req.body;
  if (!id || !title || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const exists = books.find(b => b.id === id);
  if (exists) {
    return res.status(400).json({ message: "Book ID already exists" });
  }
  books.push({ id, title, author });
  res.json({ message: "Book added successfully" });
});

// Update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  books = books.map(b => (b.id === id ? { ...b, title, author } : b));
  res.json({ message: "Book updated successfully" });
});

// Delete book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));

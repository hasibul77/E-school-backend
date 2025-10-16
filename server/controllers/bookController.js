import Book from "../models/Book.js";

// 📘 Get all books (Public)
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// 🧑‍🏫 Create a new book (Instructor/Admin only)
export const createBook = async (req, res) => {
  try {
    const { title, author, description, price } = req.body;

    if (req.user.role !== "instructor" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only instructors or admins can create books" });
    }

    const newBook = await Book.create({
      title,
      author,
      description,
      price,
    });

    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error: error.message });
  }
};

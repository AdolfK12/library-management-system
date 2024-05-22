const { Book, Category } = require("../models");
const upload = require("../helpers/uploadHelper");

class BooksController {
  static async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({
        include: [Category],
      });
      res.status(200).json(books);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving books", error: error.message });
    }
  }

  static async getBook(req, res) {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id, {
        include: [Category],
      });
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving book", error: error.message });
    }
  }

  static createBook(req, res) {
    upload.single("cover")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else if (req.file === undefined) {
        res.status(400).json({ message: "No file selected!" });
      } else {
        const { title, description, pages, categoryId } = req.body;
        const coverPath = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
        try {
          const book = await Book.create({
            title,
            description,
            pages,
            categoryId,
            coverPath: coverPath,
          });

          res.status(201).json({ message: "Book created successfully", book });
        } catch (error) {
          console.log(`Failed to create book with coverPath: ${coverPath}`);
          res
            .status(500)
            .json({ message: "Error creating book", error: error.message });
        }
      }
    });
  }

  static updateBook(req, res) {
    upload.single("cover")(req, res, async (err) => {
      const { id } = req.params;
      const { title, description, pages, categoryId } = req.body;

      if (err) {
        res.status(400).json({ message: err });
      } else {
        try {
          const book = await Book.findByPk(id);
          if (!book) {
            return res.status(404).json({ message: "Book not found" });
          }

          const newCoverPath = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/${
                req.file.filename
              }`
            : book.coverPath;

          const updatedBook = await book.update({
            title: title || book.title,
            description: description || book.description,
            pages: pages || book.pages,
            categoryId: categoryId || book.categoryId,
            coverPath: newCoverPath,
          });

          res
            .status(200)
            .json({ message: "Book updated successfully", book: updatedBook });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error updating book", error: error.message });
        }
      }
    });
  }

  static async deleteBook(req, res) {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      await book.destroy();
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting book", error: error.message });
    }
  }
}

module.exports = BooksController;

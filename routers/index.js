const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const categoriesController = require("../controllers/categoriesController");

// Book Routes
router.get("/books", booksController.getAllBooks);
router.get("/books/:id", booksController.getBook);
router.post("/books", booksController.createBook);
router.put("/books/:id", booksController.updateBook);
router.delete("/books/:id", booksController.deleteBook);

// Category Routes
router.get("/categories", categoriesController.getAllCategories);
router.get("/categories/:id", categoriesController.getCategory);
router.post("/categories", categoriesController.createCategory);
router.put("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);

module.exports = router;

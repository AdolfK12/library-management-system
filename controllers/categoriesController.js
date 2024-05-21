const { Category } = require("../models");

class CategoriesController {
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving categories", error: error.message });
    }
  }

  static async getCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving category", error: error.message });
    }
  }

  static async createCategory(req, res) {
    try {
      const { categoryName } = req.body;
      if (!categoryName) {
        return res.status(400).json({ message: "Category name is required" });
      }
      const newCategory = await Category.create({ categoryName });
      res.status(201).json({
        message: "Category created successfully",
        category: newCategory,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating category", error: error.message });
    }
  }

  static async updateCategory(req, res) {
    try {
      const { categoryName } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      await category.update({ categoryName });
      res.status(200).json({
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating category", error: error.message });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting category", error: error.message });
    }
  }
}

module.exports = CategoriesController;

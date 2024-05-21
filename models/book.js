"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" },
          len: {
            args: [10, 500],
            msg: "Description should be between 10 and 500 characters",
          },
        },
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Pages must be an integer" },
          min: {
            args: [1],
            msg: "Pages must be at least 1",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Category ID must be an integer" },
        },
      },
      coverPath: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^(https?:\/\/)?(localhost|127\.0\.0\.1|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\/?.*$/,
            msg: "Cover path must be a valid URL",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
    }
  );
  return Book;
};

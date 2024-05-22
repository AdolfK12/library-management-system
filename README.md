# Library Management System Backend

## Description

This project serves as the backend for a Library Management System, designed to efficiently manage and organize books. It supports categories, book inventories, and includes functionality for uploading book covers.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides robust features for web and mobile applications development.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server, featuring solid transaction support, relations, eager and lazy loading, read replication, and more.
- **PostgreSQL**: An open-source object-relational database system known for its reliability, robust features, and performance.
- **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for uploading files.
- **CORS**: A package that enables CORS (Cross-Origin Resource Sharing) with various options.

## Features

- CRUD (Create, Read, Update, Delete) operations for books and categories.
- Image upload functionality for book covers using Multer.
- Relationships between books and categories to organize the collection efficiently.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   ```
2. **Install dependencies:**
   ```bash
   cd library-management-system
   npm install
   ```
3. **Set up the database:**

- Ensure PostgreSQL is installed and running on your machine.
- Create a database for the project.
- Configure the database settings in config/config.json.

4. **Run database migrations::**
   ```bash
   npx sequelize-cli db:migrate
   ```
5. **Start the server:**
   ```bash
   npx run app.js
   ```

## API Endpoints

### Books

- **GET /books**

  - Retrieves all books, including their associated categories.
  - **Responses**:
    - **200 OK**: Returns a list of books.
    - **500 Internal Server Error**: Error in retrieving books.

- **GET /books/:id**

  - Retrieves a specific book by its ID.
  - **Responses**:
    - **200 OK**: Returns the requested book.
    - **404 Not Found**: Book not found.
    - **500 Internal Server Error**: Error in retrieving the book.

- **POST /books**

  - Creates a new book with details including title, description, pages, category, and an uploaded cover image.
  - **Responses**:
    - **201 Created**: Book created successfully.
    - **400 Bad Request**: Required data not provided or error in file upload.
    - **500 Internal Server Error**: Error in creating the book.

- **PUT /books/:id**

  - Updates the details of an existing book. If a new cover image is uploaded, it updates the cover image URL.
  - **Responses**:
    - **200 OK**: Book updated successfully.
    - **404 Not Found**: Book not found.
    - **500 Internal Server Error**: Error in updating the book.

- **DELETE /books/:id**
  - Deletes a book by its ID.
  - **Responses**:
    - **200 OK**: Book deleted successfully.
    - **404 Not Found**: Book not found.
    - **500 Internal Server Error**: Error in deleting the book.

### Categories

- **GET /categories**

  - Retrieves all categories.
  - **Responses**:
    - **200 OK**: Returns all categories.
    - **500 Internal Server Error**: Error in retrieving categories.

- **GET /categories/:id**

  - Retrieves a specific category by its ID.
  - **Responses**:
    - **200 OK**: Returns the requested category.
    - **404 Not Found**: Category not found.
    - **500 Internal Server Error**: Error in retrieving the category.

- **POST /categories**

  - Creates a new category with a specified name.
  - **Responses**:
    - **201 Created**: Category created successfully.
    - **400 Bad Request**: Category name is required.
    - **500 Internal Server Error**: Error in creating the category.

- **PUT /categories/:id**

  - Updates the name of an existing category.
  - **Responses**:
    - **200 OK**: Category updated successfully.
    - **404 Not Found**: Category not found.
    - **500 Internal Server Error**: Error in updating the category.

- **DELETE /categories/:id**
  - Deletes a category by its ID.
  - **Responses**:
    - **200 OK**: Category deleted successfully.
    - **404 Not Found**: Category not found.
    - **500 Internal Server Error**: Error in deleting the category.

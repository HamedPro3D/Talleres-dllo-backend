const express = require("express");
const auth = require("../middleware/auth");
const { checkPermission } = require("../middleware/permissions");
const {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  softDeleteBook,
  getBookReservations
} = require("../controllers/book.controller");

const router = express.Router();

// READ (* Libros) - sin auth
router.get("/", getBooks);

// READ (1 Libro) - sin auth
router.get("/:id", getBookById);

// CREATE (Libro) - requiere auth + permiso
router.post(
  "/",
  auth,
  checkPermission("CREATE_BOOKS"),
  createBook
);

// UPDATE (Libro) - requiere auth + permiso
router.put(
  "/:id",
  auth,
  checkPermission("UPDATE_BOOKS"),
  updateBook
);

// DELETE (Libro) - soft delete - requiere auth + permiso
router.delete(
  "/:id",
  auth,
  checkPermission("DISABLE_BOOKS"),
  softDeleteBook
);

// Historial de reservas de un libro (puede ser público o con auth; aquí sin auth)
router.get("/:id/reservations", getBookReservations);

module.exports = router;

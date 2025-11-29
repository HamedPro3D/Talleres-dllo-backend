const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const bookRoutes = require("./book.routes");
const reservationRoutes = require("./reservation.routes");

const router = express.Router();

// /api/auth/...
router.use("/auth", authRoutes);

// /api/users/...
router.use("/users", userRoutes);

// /api/books/...
router.use("/books", bookRoutes);

// /api/reservations/...
router.use("/reservations", reservationRoutes);

module.exports = router;

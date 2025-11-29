const express = require("express");
const auth = require("../middleware/auth");
const {
  createReservation,
  getMyReservations,
  deliverReservation,
  deleteReservation
} = require("../controllers/reservation.controller");

const router = express.Router();

// Crear reserva
router.post("/", auth, createReservation);

// Obtener mis reservas
router.get("/my", auth, getMyReservations);

// Entregar un libro
router.post("/:id/deliver", auth, deliverReservation);

// ❗ NUEVO: borrar una reserva por ID
router.delete("/:id", auth, deleteReservation);

module.exports = router;

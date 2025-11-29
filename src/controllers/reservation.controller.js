const Reservation = require("../models/reservation.model");
const Book = require("../models/book.model");

// Crear una reserva
const createReservation = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "bookId es obligatorio" });
    }

    const book = await Book.findOne({ _id: bookId, disabled: false });
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    if (!book.available) {
      return res.status(400).json({ message: "El libro no está disponible" });
    }

    // Validar reserva activa del mismo libro
    const existingReservation = await Reservation.findOne({
      user: req.user.id,
      book: bookId,
      deliveredAt: null
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "Ya tienes una reserva activa para este libro"
      });
    }

    const reservation = await Reservation.create({
      user: req.user.id,
      book: bookId,
      reservedAt: new Date(),
      deliveredAt: null
    });

    book.available = false;
    await book.save();

    res.status(201).json({
      message: "Reserva creada",
      reservation
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creando reserva",
      error: err.message
    });
  }
};

// Obtener reservas del usuario actual
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate("book", "title author publisher available")
      .sort({ reservedAt: -1 });

    res.json(reservations);
  } catch (err) {
    res.status(500).json({
      message: "Error obteniendo reservas",
      error: err.message
    });
  }
};

// Marcar una reserva como entregada
const deliverReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id).populate("book");
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "No puedes entregar esta reserva" });
    }

    if (reservation.deliveredAt) {
      return res.status(400).json({ message: "Esta reserva ya fue entregada" });
    }

    reservation.deliveredAt = new Date();
    await reservation.save();

    const book = await Book.findById(reservation.book._id);
    book.available = true;
    await book.save();

    res.json({
      message: "Libro entregado correctamente",
      reservation
    });
  } catch (err) {
    res.status(500).json({
      message: "Error entregando libro",
      error: err.message
    });
  }
};

// 🆕 Eliminar una reserva por ID
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "No tienes permiso para eliminar esta reserva"
      });
    }

    // ⭐ NUEVO: restaurar disponibilidad del libro si la reserva no fue entregada
    if (!reservation.deliveredAt) {
      const book = await Book.findById(reservation.book);
      if (book) {
        book.available = true;
        await book.save();
      }
    }

    // Eliminar reserva
    await reservation.deleteOne();

    res.json({ message: "Reserva eliminada y libro reactivado" });
  } catch (err) {
    res.status(500).json({
      message: "Error eliminando reserva",
      error: err.message
    });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  deliverReservation,
  deleteReservation
};

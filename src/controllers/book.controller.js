const Book = require("../models/book.model");
const Reservation = require("../models/reservation.model");

// CREATE (Libro) - requiere permiso CREATE_BOOKS
const createBook = async (req, res) => {
  try {
    const { title, genre, author, publisher, publicationDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "title es obligatorio" });
    }

    const book = await Book.create({
      title,
      genre,
      author,
      publisher,
      publicationDate
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error creando libro", error: err.message });
  }
};

// READ (1 Libro)
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ _id: id, disabled: false });
    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo libro", error: err.message });
  }
};

// READ (* Libros) con filtros + paginación + incluye ID y datos completos
const getBooks = async (req, res) => {
  try {
    let {
      genre,
      author,
      publisher,
      title,
      available,
      fromDate,
      toDate,
      page = 1,
      limit = 10,
      includeDisabled
    } = req.query;

    const filters = {};

    // Excluir libros deshabilitados por defecto
    if (!includeDisabled || includeDisabled === "false") {
      filters.disabled = false;
    }

    // Helper para búsquedas flexibles (contiene, sin importar mayúsculas/minúsculas)
    const makeRegex = (value) => new RegExp(value, "i");

    if (genre) filters.genre = makeRegex(genre);
    if (author) filters.author = makeRegex(author);
    if (publisher) filters.publisher = makeRegex(publisher);
    if (title) filters.title = makeRegex(title);

    // disponibilidad: acepta "true" / "false"
    if (typeof available === "string") {
      if (available.toLowerCase() === "true") filters.available = true;
      if (available.toLowerCase() === "false") filters.available = false;
    }

    // Filtro por rango de fechas
    if (fromDate || toDate) {
      filters.publicationDate = {};
      if (fromDate) filters.publicationDate.$gte = new Date(fromDate);
      if (toDate) filters.publicationDate.$lte = new Date(toDate);
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);

    const total = await Book.countDocuments(filters);

    const books = await Book.find(filters)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ title: 1 })
      .select("-__v");

    res.json({
      books,
      pagination: {
        page: pageNum,
        maxPage: Math.ceil(total / limitNum) || 0,
        limit: limitNum,
        total
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo libros", error: err.message });
  }
};


// UPDATE (Libro) - requiere permiso UPDATE_BOOKS para info de libro
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = { ...req.body };

    const book = await Book.findOneAndUpdate(
      { _id: id, disabled: false },
      updateData,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error actualizando libro", error: err.message });
  }
};

// DELETE (Libro) - Soft delete
const softDeleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOneAndUpdate(
      { _id: id, disabled: false },
      { disabled: true },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json({ message: "Libro inhabilitado (soft delete)", book });
  } catch (err) {
    res.status(500).json({ message: "Error inhabilitando libro", error: err.message });
  }
};

// Historial de reservas de un libro
const getBookReservations = async (req, res) => {
  try {
    const { id } = req.params;

    const reservations = await Reservation.find({ book: id })
      .populate("user", "name")
      .sort({ reservedAt: -1 });

    const result = reservations.map((r) => ({
      userName: r.user?.name,
      reservedAt: r.reservedAt,
      deliveredAt: r.deliveredAt
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({
      message: "Error obteniendo historial del libro",
      error: err.message
    });
  }
};

module.exports = {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  softDeleteBook,
  getBookReservations
};

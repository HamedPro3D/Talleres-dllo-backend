const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");

// CREATE (Usuario) - Registro (sin autenticación)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email y password son obligatorios" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      permissions: permissions || []
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      permissions: user.permissions
    });
  } catch (err) {
    res.status(500).json({ message: "Error creando usuario", error: err.message });
  }
};

// READ (Usuario) - información del usuario actual
// Debe ser seguro => requiere auth
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id, disabled: false }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo usuario", error: err.message });
  }
};

// UPDATE (Usuario)
// Permite que el usuario se modifique a sí mismo sin requerir UPDATE_USERS
// Solo exige permisos cuando se intenta modificar a OTRO usuario.
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isSelf = req.user.id === id;
    const canModifyOthers = (req.user.permissions || []).includes("UPDATE_USERS");

    // Si intenta modificar a otra persona sin permisos → prohibido
    if (!isSelf && !canModifyOthers) {
      return res.status(403).json({ message: "No puedes modificar este usuario" });
    }

    // Permitir que Andrea modifique completamente su usuario (incluyendo permisos)
    const updateData = { ...req.body };
    delete updateData.password; // nunca permitir cambiar password aquí

    const user = await User.findOneAndUpdate(
      { _id: id, disabled: false },
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: "Error actualizando usuario", error: err.message });
  }
};

// DELETE (Usuario) - Soft delete
const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const isSelf = req.user.id === id;
    const canDisableOthers = (req.user.permissions || []).includes("DISABLE_USERS");

    if (!isSelf && !canDisableOthers) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para inhabilitar este usuario" });
    }

    const user = await User.findOneAndUpdate(
      { _id: id, disabled: false },
      { disabled: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario inhabilitado (soft delete)", user });
  } catch (err) {
    res.status(500).json({ message: "Error inhabilitando usuario", error: err.message });
  }
};

// Historial de reservas de un usuario (usuario actual)
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.id })
      .populate("book", "title")
      .sort({ reservedAt: -1 });

    const result = reservations.map((r) => ({
      bookTitle: r.book?.title,
      reservedAt: r.reservedAt,
      deliveredAt: r.deliveredAt
    }));

    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo historial de reservas", error: err.message });
  }
};

module.exports = {
  registerUser,
  getCurrentUser,
  updateUser,
  softDeleteUser,
  getMyReservations
};

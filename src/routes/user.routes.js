const express = require("express");
const {
  registerUser,
  getCurrentUser,
  updateUser,
  softDeleteUser,
  getMyReservations
} = require("../controllers/user.controller");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE (Usuario) - sin auth
// POST /api/users
router.post("/", registerUser);

// READ (Usuario actual) - GET /api/users/me
router.get("/me", auth, getCurrentUser);

// UPDATE (Usuario) - PUT /api/users/:id
router.put("/:id", auth, updateUser);

// DELETE (Usuario) - soft delete - DELETE /api/users/:id
router.delete("/:id", auth, softDeleteUser);

// Historial de reservas del usuario actual - GET /api/users/me/reservations
router.get("/me/reservations", auth, getMyReservations);

// ⚠️ Endpoint temporal SOLO para crear admin de prueba
router.post("/seed-admin", async (req, res) => {
  try {
    const User = require("../models/user.model");

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      return res.json({ message: "Admin ya existe" });
    }

    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",
      permissions: [
        "CREATE_BOOKS",
        "UPDATE_BOOKS",
        "DISABLE_BOOKS",
        "UPDATE_USERS",
        "DELETE_USERS"
      ]
    });

    await admin.save();
    res.json({
      message: "Admin creado",
      admin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

// ⚠️ Endpoint temporal para crear un admin (solo para desarrollo)
router.post("/seed-admin", async (req, res) => {
  const User = require("../models/user.model");

  const admin = new User({
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    permissions: [
      "CREATE_BOOKS",
      "UPDATE_BOOKS",
      "DISABLE_BOOKS",
      "UPDATE_USERS"
    ]
  });

  await admin.save();
  res.json(admin);
});

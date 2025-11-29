const express = require("express");
const { login } = require("../controllers/auth.controller");

const router = express.Router();

// READ (Usuario) (Login) - sin auth
router.post("/login", login);

module.exports = router;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // READ (Usuario) (Login) - debe ser seguro
    const user = await User.findOne({ email, disabled: false });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        permissions: user.permissions
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error en login", error: err.message });
  }
};

module.exports = { login };

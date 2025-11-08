const express = require('express');
const router = express.Router();

const {
  convertidorTemp,
  resolvedor,
  mejorParidad,
  peorParidad
} = require('../taller-01');

router.post('/convertir-temp', (req, res) => {
  const { c } = req.body;
  const resultado = convertidorTemp(Number(c));
  res.json({ resultado });
});

router.post('/resolvente', (req, res) => {
  const { a, b, c, positivo } = req.body;
  const resultado = resolvedor(Number(a), Number(b), Number(c), !!positivo);
  res.json({ resultado });
});

router.post('/mejor-paridad', (req, res) => {
  const { num } = req.body;
  res.json({ resultado: mejorParidad(Number(num)) });
});

router.post('/peor-paridad', (req, res) => {
  const { num } = req.body;
  res.json({ resultado: peorParidad(Number(num)) });
});

module.exports = router;

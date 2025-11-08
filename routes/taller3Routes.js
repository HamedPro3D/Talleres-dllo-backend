const express = require('express');
const router = express.Router();

const {
  desglosarString,
  twoSum,
  conversionRomana,
  descomposicion
} = require('../taller-03');

router.post('/desglosar', (req, res) => {
  const { texto, tipo } = req.body;
  res.json({ resultado: desglosarString(texto, tipo) });
});

router.post('/two-sum', (req, res) => {
  const { numeros, objetivo } = req.body;
  res.json({ resultado: twoSum(numeros, objetivo) });
});

router.post('/romano-a-int', (req, res) => {
  const { romano } = req.body;
  res.json({ resultado: conversionRomana(romano) });
});

router.post('/descomposicion', (req, res) => {
  const { entrada } = req.body;
  res.json({ resultado: descomposicion(entrada) });
});

module.exports = router;

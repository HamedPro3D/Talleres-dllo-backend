const express = require('express');
const router = express.Router();

const {
  findMax,
  includes,
  sum,
  missingNumbers
} = require('../taller-02');

router.post('/find-max', (req, res) => {
  const { lista } = req.body;
  res.json({ resultado: findMax(lista) });
});

router.post('/includes', (req, res) => {
  const { lista, numero } = req.body;
  res.json({ resultado: includes(lista, numero) });
});

router.post('/sum', (req, res) => {
  const { lista } = req.body;
  res.json({ resultado: sum(lista) });
});

router.post('/missing-numbers', (req, res) => {
  const { lista } = req.body;
  res.json({ resultado: missingNumbers(lista) });
});

module.exports = router;

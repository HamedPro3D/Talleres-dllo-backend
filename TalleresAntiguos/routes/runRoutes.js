const express = require('express');
const router = express.Router();

const t1 = require('../taller-01');
const t2 = require('../taller-02');
const t3 = require('../taller-03');

const registry = {
  taller1: {
    'convertir-temp': t1.convertidorTemp,
    'resolvente': t1.resolvedor,
    'mejor-paridad': t1.mejorParidad,
    'peor-paridad': t1.peorParidad,
  },
  taller2: {
    'find-max': t2.findMax,
    'includes': t2.includes,
    'sum': t2.sum,
    'missing-numbers': t2.missingNumbers,
  },
  taller3: {
    'desglosar': t3.desglosarString,
    'two-sum': t3.twoSum,
    'romano-a-int': t3.conversionRomana,
    'descomposicion': t3.descomposicion,
  },
};


router.get('/run/registry', (_req, res) => {
  const out = {};
  for (const [grupo, acciones] of Object.entries(registry)) {
    out[grupo] = Object.keys(acciones);
  }
  res.json(out);
});

router.post('/run', (req, res) => {
  const { taller, accion, args = [], kwargs = null } = req.body || {};

  if (!taller || !accion) {
    return res.status(400).json({ error: 'Falta "taller" o "accion".' });
  }
  const group = registry[taller];
  if (!group) return res.status(404).json({ error: `Taller desconocido: ${taller}` });

  const fn = group[accion];
  if (!fn) return res.status(404).json({ error: `Acción desconocida para ${taller}: ${accion}` });

  try {
    let resultado;
    if (Array.isArray(args) && !kwargs) {
      resultado = fn(...args);
    } else if (kwargs && typeof kwargs === 'object') {
      // En JS no hay kwargs nativos; ordenamos por clave para tener un orden estable
      const ordered = Object.keys(kwargs).sort().map(k => kwargs[k]);
      resultado = fn(...ordered);
    } else {
      return res.status(400).json({ error: 'Proporciona "args" (array) o "kwargs" (objeto).' });
    }
    res.json({ ok: true, taller, accion, resultado });
  } catch (err) {
    res.status(500).json({ error: err?.message || 'Error ejecutando función.' });
  }
});

module.exports = router;

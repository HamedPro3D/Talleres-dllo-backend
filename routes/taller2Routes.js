const express = require('express');
const r = express.Router();
const { findMax, includes, sum, missingNumbers } = require('../taller-02');

r.post('/find-max', (req,res)=>{ const { lista } = req.body; res.json({ resultado: findMax(lista) }); });
r.post('/includes', (req,res)=>{ const { lista, numero } = req.body; res.json({ resultado: includes(lista, numero) }); });
r.post('/sum', (req,res)=>{ const { lista } = req.body; res.json({ resultado: sum(lista) }); });
r.post('/missing-numbers', (req,res)=>{ const { lista } = req.body; res.json({ resultado: missingNumbers(lista) }); });

module.exports = r;

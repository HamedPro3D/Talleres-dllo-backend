const express = require('express');
const r = express.Router();
const { desglosarString, twoSum, conversionRomana, descomposicion } = require('../taller-03');

r.post('/desglosar', (req,res)=>{ const { texto, tipo } = req.body; res.json({ resultado: desglosarString(texto, tipo) }); });
r.post('/two-sum', (req,res)=>{ const { numeros, objetivo } = req.body; res.json({ resultado: twoSum(numeros, objetivo) }); });
r.post('/romano-a-int', (req,res)=>{ const { romano } = req.body; res.json({ resultado: conversionRomana(romano) }); });
r.post('/descomposicion', (req,res)=>{ const { entrada } = req.body; res.json({ resultado: descomposicion(entrada) }); });

module.exports = r;

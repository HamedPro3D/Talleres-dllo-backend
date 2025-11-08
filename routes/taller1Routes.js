const express = require('express');
const r = express.Router();
const { convertidorTemp, resolvedor, mejorParidad, peorParidad } = require('../taller-01');

r.post('/convertir-temp', (req,res)=>{ const { c } = req.body; res.json({ resultado: convertidorTemp(c) }); });
r.post('/resolvente', (req,res)=>{ const { a,b,c,positivo } = req.body; res.json({ resultado: resolvedor(a,b,c,positivo) }); });
r.post('/mejor-paridad', (req,res)=>{ const { num } = req.body; res.json({ resultado: mejorParidad(num) }); });
r.post('/peor-paridad', (req,res)=>{ const { num } = req.body; res.json({ resultado: peorParidad(num) }); });

module.exports = r;

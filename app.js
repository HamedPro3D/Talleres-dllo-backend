const express = require('express');
const app = express();

app.use(express.json());

// Rutas
app.use('/taller1', require('./routes/taller1Routes'));
app.use('/taller2', require('./routes/taller2Routes'));
app.use('/taller3', require('./routes/taller3Routes'));

// opcional: endpoint de salud para probar rápido
app.get('/health', (req, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`API lista en http://${HOST}:${PORT}`);
});

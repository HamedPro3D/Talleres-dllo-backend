require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const API_PREFIX = process.env.API_PREFIX || '';

app.use(express.json());

app.use(`${API_PREFIX}/taller1`, require('./routes/taller1Routes'));
app.use(`${API_PREFIX}/taller2`, require('./routes/taller2Routes'));
app.use(`${API_PREFIX}/taller3`, require('./routes/taller3Routes'));

app.use(`${API_PREFIX}`, require('./routes/runRoutes'));

app.get(`${API_PREFIX}/health`, (req, res) => res.send('ok'));

app.listen(PORT, HOST, () => {
  console.log(`API lista en http://${HOST}:${PORT}${API_PREFIX}`);
});

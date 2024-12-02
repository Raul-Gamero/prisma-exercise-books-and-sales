require('dotenv').config(); // Importamos dotenv

const express = require('express'); // Importamos express
const morgan = require('morgan'); // Importamos morgan


const routes = require('./routes/index'); // Importamos el router de routes

const app = express(); // Instanciamos express
const PORT = process.env.PORT || 3000;// Definimos el puerto

// Middlewares generales
app.use(express.json()); // Middleware para manejar JSON
app.use(morgan('dev')); // Middleware para loguear peticiones en formato 'dev'

// Rutas
app.use('/', routes); // Usamos el router de routes

// Manejador de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});





/* const express = require("express");
const app = express();
const PORT = 3000;
const morgan = require("morgan");
app.use(morgan('dev'));
app.use(express.json());
const router = require('./routes');
app.use('/', router);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); */

// He agregado morgan y cambiado en nombre de la constante a routes

const express = require('express'); //importamos express
const app = express(); //instanciamos express
const PORT = 3000; //definimos el puerto

const routes = require('./routes'); //importamos el router de routes
const morgan = require("morgan"); //importamos morgan




app.use(express.json()); //usamos express.json()
app.use(morgan('dev')); //usamos morgan con el formato 'dev'


app.use('/', routes); //usamos el router de routes

//manejador de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});




const express = require('express'); //importamos express
const router = express.Router(); //instanciamos un router

const booksRoutes = require('./books'); //importamos el router de books
const salesRoutes = require('./sales'); //importamos el router de sales

router.use('/books', booksRoutes); //usamos el router de books
router.use('/sales', salesRoutes); //usamos el router de sales

module.exports = router; //exportamos el router

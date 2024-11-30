const express = require('express'); //importamos express
const router = express.Router(); //instanciamos un router

const prisma = require('../prisma'); //importamos prisma


// Obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const sales = await prisma.venta.findMany();
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
});

// Obtener una venta por ID 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await prisma.venta.findUnique({
            where: { ID_Venta: parseInt(id) },
        });
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });    
        }
        res.json(sale);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
});

// Obtener todas las ventas de un libro por ISBN
router.get('/book/:isbn', async (req, res) => {
    const { isbn } = req.params;
    try {
        const sales = await prisma.venta.findMany({
            where: { ISBN: isbn },
        });
        res.json(sales);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas del libro' });
    }
});

// Obtener todas las ventas realizadas en una fecha específica
router.get('/date/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const sales = await prisma.venta.findMany({
            where: {
                Fecha_Venta: new Date(date),
            },
        });
        res.json(sales);
    }   catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas por fecha' });
    }
});

// Obtener el libro con el mayor ingreso total 
router.get('/top', async (req, res) => {
    try {
        const sales = await prisma.venta.groupBy({
            by: ['ISBN'],
            _sum: { Cantidad: true }, 
        });

        if (sales.length === 0) {
            return res.status(404).json({ error: 'No se encontraron ventas' });
        }

        const topSale = sales.reduce((max, current) => {
            return current._sum.Cantidad > max.total ? { isbn: current.ISBN, total: current._sum.Cantidad } : max;
        }, { isbn: null, total: 0 });

        const book = await prisma.libro.findUnique({
            where: { ISBN: topSale.isbn }, 
        });

        res.json({ book, totalSales: topSale.total });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro con mayor ingreso total' });
    }
});

module.exports = router; //exportamos el router
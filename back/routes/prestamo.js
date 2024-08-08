import express from 'express';
import Prestamo from '../models/Prestamo.js';
import {consulta5} from '../queries.js';

const router = express.Router();

//GET: Obtener todos los préstamos
router.get('/', async (req, res) => {
    try {
        const prestamos = await Prestamo.find();
        res.json(prestamos);
    } catch (error) {
        res.json({ message: error });
    }
});



//GET: Luis -- INICIO
router.get('/consulta5', async (req, res) => {
    const fechaInicio = req.query.fechaInicio + "T00:00:00.000Z"; // Añadir tiempo para ISODate
    const fechaFin = req.query.fechaFin + "T23:58:59.999Z"; // Añadir tiempo para ISODate

    console.log('Fecha Inicio:', fechaInicio);
    console.log('Fecha Fin:', fechaFin);

    try {
        const prestamos = await consulta5(fechaInicio, fechaFin);
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//GET: Luis  -- FINAL


//GET: Obtener un préstamo
router.get('/:prestamoId', async (req, res) => {
    try {
        const prestamo = await Prestamo.findById(req.params.prestamoId);
        res.json(prestamo);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un préstamo
router.post('/', async (req, res) => {
    const prestamo = new Prestamo({
        IDLibro: req.body.IDLibro,
        IDUsuario: req.body.IDUsuario,
        IDTrabajador: req.body.IDTrabajador,
        fechaSalida: req.body.fechaSalida,
        fechaMaxDevolucion: req.body.fechaMaxDevolucion,
        fechaDevolucion: req.body.fechaDevolucion,
        estadoDevolucion: req.body.estadoDevolucion,
        deterioro: req.body.deterioro
    });

    try {
        const savedPrestamo = await prestamo.save();
        res.json(savedPrestamo);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un préstamo
router.put('/:prestamoId', async (req, res) => {
    try {
        const updatedPrestamo = await Prestamo.updateOne(
            { _id: req.params.prestamoId },
            { $set: { 
                IDLibro: req.body.IDLibro,
                IDUsuario: req.body.IDUsuario,
                IDTrabajador: req.body.IDTrabajador,
                fechaSalida: req.body.fechaSalida,
                fechaMaxDevolucion: req.body.fechaMaxDevolucion,
                fechaDevolucion: req.body.fechaDevolucion,
                estadoDevolucion: req.body.estadoDevolucion,
                deterioro: req.body.deterioro
            } }
        );
        res.json(updatedPrestamo);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los préstamos
router.delete('/', async (req, res) => {
    try {
        const removedPrestamos = await Prestamo.remove();
        res.json(removedPrestamos);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un préstamo
router.delete('/:prestamoId', async (req, res) => {
    try {
        const removedPrestamo = await Prestamo.remove({ _id: req.params.prestamoId });
        res.json(removedPrestamo);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
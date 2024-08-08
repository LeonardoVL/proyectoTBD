import express from 'express';
import Prestamo from '../models/Prestamo.js';

import {consultaLibrosPeriodoTiempo} from '../queries.js';

import { consultaPrestamos } from '../queries.js';
import Libro from '../models/Libro.js';
import Trabajador from '../models/Trabajador.js';

const router = express.Router();

//GET: Obtener todos los préstamos
router.get('/', async (req, res) => {
    const dniUsuario = req.query.usuario;
    const libroNombre = req.query.libroNombre;
    const libroCategoria = req.query.libroCategoria;
    const libroEditorial = req.query.libroEditorial;
    const libroAutor = req.query.libroAutor;
    const fecPrestInicio = req.query.fecPrestInicio;
    const fecPrestFin = req.query.fecPrestFin;
    const fecDevInicio = req.query.fecDevInicio;
    const fecDevFin = req.query.fecDevFin;
    try {
        const data = await consultaPrestamos(dniUsuario, libroNombre, libroCategoria, libroEditorial, libroAutor, fecPrestInicio, fecPrestFin, fecDevInicio, fecDevFin);
        res.json(data);
    } catch(error){
        res.json({message : error});
    }
});



//GET: Luis -- INICIO
router.get('/consultaLibrosPeriodoTiempo', async (req, res) => {
    const fechaInicio = req.query.fechaInicio + "T00:00:00.000Z"; // Añadir tiempo para ISODate
    const fechaFin = req.query.fechaFin + "T23:58:59.999Z"; // Añadir tiempo para ISODate

    console.log('Fecha Inicio:', fechaInicio);
    console.log('Fecha Fin:', fechaFin);

    try {
        const prestamos = await consultaLibrosPeriodoTiempo(fechaInicio, fechaFin);
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//GET: Luis  -- FINAL


//GET: Obtener un préstamo
router.get('/:prestamoByUser', async (req, res) => {
    try {
        const prestamo = await Prestamo.find({ IDUsuario: req.params.prestamoByUser });

        const prestamosConInfo = await Promise.all(prestamo.map(async (prestamo) => {
            const libro = await Libro.findById(prestamo.IDLibro);
            const trabajador = await Trabajador.findById(prestamo.IDTrabajador);

            return {
                ...prestamo._doc,
                libro: libro ? libro.titulo : null,
                trabajador: trabajador ? trabajador.nombre + " " + trabajador.apellido : null
            };
        }));
        console.log(prestamosConInfo)
        res.json(prestamosConInfo);
    } catch (error) {
        res.json({ message: error });
    }
});

// GET: Obtener el conteo de préstamos por estado
router.get('/usuario/:prestamoByUser', async (req, res) => {
    try {
        const prestamos = await Prestamo.aggregate([
            { $match: { IDUsuario: req.params.prestamoByUser } },
            {
                $group: {
                    _id: '$estadoPrestamo',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Inicializar el resultado con todos los estados en 0
        const resultado = {
            Multa: 0,
            Activo: 0,
            Devuelto: 0
        };

        // Asignar los conteos a los estados correspondientes
        prestamos.forEach(prestamo => {
            if (resultado.hasOwnProperty(prestamo._id)) {
                resultado[prestamo._id] = prestamo.count;
            }
        });

        console.log(resultado);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
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
        estadoPrestamo: req.body.estadoPrestamo,
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
                estadoPrestamo: req.body.estadoPrestamo,
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
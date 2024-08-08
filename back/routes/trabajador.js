import express from 'express';
import Trabajador from '../models/Trabajador.js';

const router = express.Router();

//GET: Obtener todos los trabajadores
router.get('/', async (req, res) => {
    try {
        const trabajadores = await Trabajador.find();
        res.json(trabajadores);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener un trabajador
router.get('/:trabajadorId', async (req, res) => {
    try {
        const trabajador = await Trabajador.findById(req.params.trabajadorId);
        res.json(trabajador);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un trabajador
router.post('/', async (req, res) => {
    const trabajador = new Trabajador({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correoTrabajador: req.body.correoTrabajador,
        inicioTurno: req.body.inicioTurno,
        finTurno: req.body.finTurno,
        IDTipoUsuario: req.body.IDTipoUsuario,
        IDTipoEstado: req.body.IDTipoEstado
    });

    try {
        const savedTrabajador = await trabajador.save();
        res.json(savedTrabajador);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un trabajador
router.put('/:trabajadorId', async (req, res) => {
    try {
        const updatedTrabajador = await Trabajador.updateOne(
            { _id: req.params.trabajadorId },
            { $set: { 
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correoTrabajador: req.body.correoTrabajador,
                inicioTurno: req.body.inicioTurno,
                finTurno: req.body.finTurno,
                IDTipoUsuario: req.body.IDTipoUsuario,
                IDTipoEstado: req.body.IDTipoEstado
            } }
        );
        res.json(updatedTrabajador);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los trabajadores
router.delete('/', async (req, res) => {
    try {
        const removedTrabajadores = await Trabajador.remove();
        res.json(removedTrabajadores);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un trabajador
router.delete('/:trabajadorId', async (req, res) => {
    try {
        const removedTrabajador = await Trabajador.remove({ _id: req.params.trabajadorId });
        res.json(removedTrabajador);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
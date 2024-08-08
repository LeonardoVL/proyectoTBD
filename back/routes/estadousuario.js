import express from 'express';
import EstadoUsuario from '../models/EstadoUsuario.js';

const router = express.Router();

//GET: Obtener todos los estados de usuario
router.get('/', async (req, res) => {
    try {
        const estadosUsuario = await EstadoUsuario.find();
        res.json(estadosUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener un estado de usuario
router.get('/:estadoUsuarioId', async (req, res) => {
    try {
        const estadoUsuario = await EstadoUsuario.findById(req.params.estadoUsuarioId);
        res.json(estadoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un estado de usuario
router.post('/', async (req, res) => {
    const estadoUsuario = new EstadoUsuario({
        tipoUsuario: req.body.tipoUsuario,
        descripcion: req.body.descripcion
    });

    try {
        const savedEstadoUsuario = await estadoUsuario.save();
        res.json(savedEstadoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un estado de usuario
router.put('/:estadoUsuarioId', async (req, res) => {
    try {
        const updatedEstadoUsuario = await EstadoUsuario.updateOne(
            { _id: req.params.estadoUsuarioId },
            { $set: { 
                tipoUsuario: req.body.tipoUsuario,
                descripcion: req.body.descripcion
            } }
        );
        res.json(updatedEstadoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los estados de usuario
router.delete('/', async (req, res) => {
    try {
        const removedEstadosUsuario = await EstadoUsuario.remove();
        res.json(removedEstadosUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un estado de usuario
router.delete('/:estadoUsuarioId', async (req, res) => {
    try {
        const removedEstadoUsuario = await EstadoUsuario.remove({ _id: req.params.estadoUsuarioId });
        res.json(removedEstadoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
import express from 'express';
import TipoUsuario from '../models/TipoUsuario.js';

const router = express.Router();

//GET: Obtener todos los tipos de usuario
router.get('/', async (req, res) => {
    try {
        const tiposUsuario = await TipoUsuario.find();
        res.json(tiposUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener un tipo de usuario
router.get('/:tipoUsuarioId', async (req, res) => {
    try {
        const tipoUsuario = await TipoUsuario.findById(req.params.tipoUsuarioId);
        res.json(tipoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un tipo de usuario
router.post('/', async (req, res) => {
    const tipoUsuario = new TipoUsuario({
        tipoUsuario: req.body.tipoUsuario
    });

    try {
        const savedTipoUsuario = await tipoUsuario.save();
        res.json(savedTipoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un tipo de usuario
router.put('/:tipoUsuarioId', async (req, res) => {
    try {
        const updatedTipoUsuario = await TipoUsuario.updateOne(
            { _id: req.params.tipoUsuarioId },
            { $set: { tipoUsuario: req.body.tipoUsuario } }
        );
        res.json(updatedTipoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los tipos de usuario
router.delete('/', async (req, res) => {
    try {
        const removedTiposUsuario = await TipoUsuario.remove();
        res.json(removedTiposUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un tipo de usuario
router.delete('/:tipoUsuarioId', async (req, res) => {
    try {
        const removedTipoUsuario = await TipoUsuario.remove({ _id: req.params.tipoUsuarioId });
        res.json(removedTipoUsuario);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
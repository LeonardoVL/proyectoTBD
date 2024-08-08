import express from 'express';
import Editorial from '../models/Editorial.js';

const router = express.Router();

//GET: Obtener todas las editoriales
router.get('/', async (req, res) => {
    try {
        const editorials = await Editorial.find();
        res.json(editorials);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener una editorial
router.get('/:editorialId', async (req, res) => {
    try {
        const editorial = await Editorial.findById(req.params.editorialId);
        res.json(editorial);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear una editorial
router.post('/', async (req, res) => {
    const editorial = new Editorial({
        nombre: req.body.nombre,
        pais: req.body.pais
    });

    try {
        const savedEditorial = await editorial.save();
        res.json(savedEditorial);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar una editorial
router.put('/:editorialId', async (req, res) => {
    try {
        const updatedEditorial = await Editorial.updateOne(
            { _id: req.params.editorialId },
            { $set: { 
                nombre: req.body.nombre,
                pais: req.body.pais
            } }
        );
        res.json(updatedEditorial);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todas las editoriales
router.delete('/', async (req, res) => {
    try {
        const removedEditorials = await Editorial.remove();
        res.json(removedEditorials);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar una editorial
router.delete('/:editorialId', async (req, res) => {
    try {
        const removedEditorial = await Editorial.findByIdAndDelete({ _id: req.params.editorialId });
        if (!removedEditorial) {
            return res.json({ message: "Editorial not found" });
        }
        res.status(200).json({ message: "Editorial deleted" });
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
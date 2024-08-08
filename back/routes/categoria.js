import express from 'express';
import Categoria from '../models/Categoria.js';

const router = express.Router();

//GET: Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
        const categories = await Categoria.find();
        res.json(categories);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener una categoría
router.get('/:categoryId', async (req, res) => {
    try {
        const category = await Categoria.findById(req.params.categoryId);
        res.json(category);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear una categoría
router.post('/', async (req, res) => {
    const category = new Categoria({
        nombre: req.body.nombre,
        descripcion: [req.body.descripcion]
    });

    try {
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar una categoría
router.put('/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Categoria.updateOne(
            { _id: req.params.categoryId },
            { $set: { 
                nombre: req.body.nombre,
                descripcion: req.body.descripcion 
            } }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todas las categorías
router.delete('/', async (req, res) => {
    try {
        const removedCategories = await Categoria.remove();
        res.json(removedCategories);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar una categoría
router.delete('/:categoryId', async (req, res) => {
    try {
        const removedCategory = await Categoria.findByIdAndDelete({ _id: req.params.categoryId });
        res.json(removedCategory);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
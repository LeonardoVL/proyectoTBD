import express from 'express';
import Autor from '../models/Autor.js';

const router = express.Router();

//GET: Obtener todos los autores
router.get('/', async (req, res) => {
    try {
        const authors = await Autor.find();
        res.json(authors);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener un autor
router.get('/:authorId', async (req, res) => {
    try {
        const author = await Autor.findById(req.params.authorId);
        res.json(author);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un autor
router.post('/', async (req, res) => {
    const author = new Autor({
        nombre: req.body.nombre,
        nacionalidad: req.body.nacionalidad
    });

    try {
        const savedAuthor = await author.save();
        res.json(savedAuthor);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un autor
router.put('/:authorId', async (req, res) => {
    try {
        const updatedAuthor = await Autor.updateOne(
            { _id: req.params.authorId },
            { $set: { 
                nombre: req.body.nombre,
                nacionalidad: req.body.nacionalidad 
            } }
        );
        res.json(updatedAuthor);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los autores
router.delete('/', async (req, res) => {
    try {
        const removedAuthors = await Autor.remove();
        res.json(removedAuthors);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un autor
router.delete('/:authorId', async (req, res) => {
    try {
        const removedAuthor = await Autor.findByIdAndDelete({ _id: req.params.authorId });
        res.json(removedAuthor);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
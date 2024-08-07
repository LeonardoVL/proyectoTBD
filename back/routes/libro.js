import express from 'express';
import Libro from '../models/Libro.js';

const router = express.Router();

//GET: Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.json({ message: error });
    }
});

//GET: Obtener un libro
router.get('/:libroId', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.libroId);
        res.json(libro);
    } catch (error) {
        res.json({ message: error });
    }
});

//POST: Crear un libro
router.post('/', async (req, res) => {
    const libro = new Libro({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        IDAutor: req.body.IDAutor,
        IDCategoria: req.body.IDCategoria,
        IDEditorial: req.body.IDEditorial,
        anioPublicacion: req.body.anioPublicacion,
        facultad: req.body.facultad,
        ejemplaresTotales: req.body.ejemplaresTotales,
        edicion: req.body.edicion,
        numeroPaginas: req.body.numeroPaginas,
        precioLibro: req.body.precioLibro,
        estadoLibro: req.body.estadoLibro
    });

    try {
        const savedLibro = await libro.save();
        res.json(savedLibro);
    } catch (error) {
        res.json({ message: error });
    }
});

//PUT: Actualizar un libro
router.put('/:libroId', async (req, res) => {
    try {
        const updatedLibro = await Libro.updateOne(
            { _id: req.params.libroId },
            { $set: { 
                titulo: req.body.titulo,
                isbn: req.body.isbn,
                IDAutor: req.body.IDAutor,
                IDCategoria: req.body.IDCategoria,
                IDEditorial: req.body.IDEditorial,
                anioPublicacion: req.body.anioPublicacion,
                facultad: req.body.facultad,
                ejemplaresTotales: req.body.ejemplaresTotales,
                edicion: req.body.edicion,
                numeroPaginas: req.body.numeroPaginas,
                precioLibro: req.body.precioLibro,
                estadoLibro: req.body.estadoLibro
            } }
        );
        res.json(updatedLibro);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar todos los libros
router.delete('/', async (req, res) => {
    try {
        const removedLibros = await Libro.remove();
        res.json(removedLibros);
    } catch (error) {
        res.json({ message: error });
    }
});

//DELETE: Eliminar un libro
router.delete('/:libroId', async (req, res) => {
    try {
        const removedLibro = await Libro.remove({ _id: req.params.libroId });
        res.json(removedLibro);
    } catch (error) {
        res.json({ message: error });
    }
});

export default router;
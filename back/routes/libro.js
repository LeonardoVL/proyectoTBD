import express from 'express';
import Libro from '../models/Libro.js';
import {consultaFacultad} from '../queries.js';
import {listarLibros} from '../queries.js';
import { obtenerPrestamosPorCategoria } from '../queries.js';
import { obtenerLibrosPrestadosPorTrabajador } from '../queries.js'
import { obtenerPorcentajeLibros } from '../queries.js';

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

//GET: Obtener libros por facultad de cada usuario que prestó
router.get('/facultad', async (req, res) => {
    try {
        const libroFacu = await consultaFacultad();
        res.json(libroFacu);
    } catch (error) {
        res.json({ message: error });
    }
});


// GET: Número de Libros Prestados por Categoría (filtrado por nombre de categoría) 
// Prueba http://localhost:3000/api/libro/prestamos/libro-info?categoria=Cuento
router.get('/prestamos/libro-info', async (req, res) => {
    const { categoria } = req.query; // Obtener el nombre de la categoría del parámetro de consulta

    try {
        const prestamosConLibroInfo = await obtenerPrestamosPorCategoria(categoria);
        res.json(prestamosConLibroInfo);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
    }
});

// GET: Libros prestados por un determinado trabajador por nombre
//http://localhost:3000/api/libro/prestamos/portrabajadornombre?nombreTrabajador=Gabriela%20Elena
router.get('/prestamos/portrabajadornombre', async (req, res) => {
    const { nombreTrabajador } = req.query; // Obtener el parámetro de consulta

    try {
        const prestamosPorTrabajador = await obtenerLibrosPrestadosPorTrabajador(nombreTrabajador);
        res.json(prestamosPorTrabajador);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
    }
});

// GET: Porcentaje general de libros prestados y disponibles
router.get('/libros/porcentaje', async (req, res) => {
    try {
        const porcentajeLibros = await obtenerPorcentajeLibros();
        res.json(porcentajeLibros);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
    }
});


// GET: Obtener libros por parámetro ingresado
router.get('/parametrico', async (req, res) => {
    try {
        const terminoValidacion = req.query.terminoValidacion;
        const titulo = terminoValidacion;
        const autor = terminoValidacion;
        const categoria = terminoValidacion;
        const libroParam = await listarLibros({ titulo, autor, categoria });
        res.json(libroParam);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
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
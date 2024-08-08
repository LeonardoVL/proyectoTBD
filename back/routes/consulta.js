import express from 'express';
import Libro from '../models/Libro.js';
import Prestamo from '../models/Prestamo.js';

const router = express.Router();

//GET: Obtener todos los libros
router.get('/prestamos/libro-info', async (req, res) => {
    try {
        const prestamosConLibroInfo = await Prestamo.aggregate([
            {
                $lookup: {
                    from: 'Libro', // Nombre de la colección de libros en MongoDB
                    let: { libroId: { $toObjectId: "$IDLibro" } }, // Convertir IDLibro a ObjectId
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$libroId"] } } }
                    ],
                    as: 'libroInfo' // Nombre del campo agregado al resultado
                }
            }
        ]);

        res.json(prestamosConLibroInfo);
    } catch (error) {
        console.error('Error al realizar la consulta:', error.message);
        res.status(500).json({ message: 'Error al realizar la consulta', error: error.message });
    }
});

export default router;
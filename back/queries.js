import Autor from './models/Autor.js';
import Categoria from './models/Categoria.js';
import Editorial from './models/Editorial.js';
import EstadoUsuario from './models/EstadoUsuario.js';
import Libro from './models/Libro.js';
import Prestamo from './models/Prestamo.js';
import TipoUsuario from './models/TipoUsuario.js';
import Trabajador from './models/Trabajador.js';
import Usuario from './models/Usuario.js';

export async function consultaFacultad() {
    try {
        const prestamosPorFacultad = await Prestamo.aggregate([
            {
                $lookup: {
                    from: 'Libro',
                    let: { libroId: { $toObjectId: "$IDLibro" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$libroId"] } } }
                    ],
                    as: 'libroInfo'
                }
            },
            {
                $unwind: "$libroInfo"
            },
            {
                $lookup: {
                    from: 'Usuario',
                    let: { usuarioId: { $toObjectId: "$IDUsuario" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$usuarioId"] } } }
                    ],
                    as: 'usuarioInfo'
                }
            },
            {
                $unwind: "$usuarioInfo"
            },
            {
                $group: {
                    _id: "$usuarioInfo.facultad",
                    totalPrestamos: { $sum: 1 }
                }
            },
            {
                $sort: { totalPrestamos: -1 }
            }
        ]);

        return prestamosPorFacultad;
    } catch (error) {
        throw new Error('Error al realizar la consulta: ' + error.message);
    }
}

// Consulta 6 Función
export async function listarLibros({ titulo, autor, categoria }) {
    try {
        const pipeline = [];

        // Always perform the lookups
        pipeline.push(
            {
                $lookup: {
                    from: 'Autor',
                    let: { autorId: { $toObjectId: "$IDAutor" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", { $toObjectId: "$$autorId" }] } } },
                    ],
                    as: 'autorInfo'
                }
            },
            {
                $unwind: { path: "$autorInfo", preserveNullAndEmptyArrays: true } // Preserve nulls for missing authors
            },
            {
                $lookup: {
                    from: 'Categoria',
                    let: { categoriaId: { $toObjectId: "$IDCategoria" } },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", { $toObjectId: "$$categoriaId" }] } } },
                    ],
                    as: 'categoriaInfo'
                }
            },
            {
                $unwind: { path: "$categoriaInfo", preserveNullAndEmptyArrays: true } // Preserve nulls for missing categories
            }
        );

        // Prepare the match conditions
        const matchConditions = [];

        if (titulo) {
            matchConditions.push({ titulo: { $regex: titulo, $options: 'i' } });
        }

        if (autor) {
            matchConditions.push({ 'autorInfo.nombre': { $regex: autor, $options: 'i' } });
        }

        if (categoria) {
            matchConditions.push({ 'categoriaInfo.nombre': { $regex: categoria, $options: 'i' } });
        }

        // If there are match conditions, add them to the pipeline
        if (matchConditions.length > 0) {
            pipeline.push({
                $match: {
                    $or: matchConditions
                }
            });
        }

        // Proyección para seleccionar solo los campos requeridos
        pipeline.push({
            $project: {
                titulo: 1,
                autor: { $ifNull: ["$autorInfo.nombre", "Desconocido"] },
                categoria: { $ifNull: ["$categoriaInfo.nombre", "Desconocido"] },
                ejemplaresTotales: 1
            }
        });

        const libros = await Libro.aggregate(pipeline);

        return libros;
    } catch (error) {
        throw new Error('Error al realizar la consulta: ' + error.message);
    }
}
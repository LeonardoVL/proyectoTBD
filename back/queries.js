import Prestamo from './models/Prestamo.js';

export async function consulta5(fechaInicio, fechaFin) {
    try {
        const consulta = [
            {
                $match: {
                    fechaSalida: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) },
                    estadoPrestamo: { $in: ["Activo", "Devuelto"] }
                }
            },
            {
                $facet: {
                    activos: [
                        { $match: { estadoPrestamo: "Activo" } },
                        { $count: "totalActivos" }
                    ],
                    devueltos: [
                        { $match: { estadoPrestamo: "Devuelto" } },
                        { $count: "totalDevueltos" }
                    ]
                }
            }
        ];

        console.log('Consulta:', JSON.stringify(consulta, null, 2));

        const resultado = await Prestamo.aggregate(consulta);

        // Manejar el resultado de la agregación
        console.log('Resultado:', JSON.stringify(resultado, null, 2));
        return resultado;
    } catch (error) {
        console.error('Error en consulta5:', error);
        throw error;
    }
}
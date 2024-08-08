import { DateTime } from 'luxon';

import Prestamo from './models/Prestamo.js';
import Usuario from './models/Usuario.js';
import Libro from './models/Libro.js';
import Categoria from './models/Categoria.js';
import Editorial from './models/Editorial.js';
import Autor from './models/Autor.js';


// Funcion extra para actualizar estado a multa
async function actualizarEstadoMulta(prestamos){
    const fechaActualUTC = DateTime.utc();
    
    for(let prestamo of prestamos){
        const itemFecMaxDev = DateTime.fromJSDate(prestamo.fechaMaxDevolucion, { zone : 'utc' });
        if(itemFecMaxDev.toISO() < fechaActualUTC.toISO()){
            prestamo.estadoPrestamo = 'Multa';
            await prestamo.save();
        }
    }
}

export async function consultaPrestamos(dniUsuario = null, libroNombre = null, libroCategoria = null, libroEditorial = null, libroAutor = null, fecPrestInicio = null, fecPrestFin = null, fecDevInicio = null, fecDevFin = null){
    try{
        let consultaPrestamo = {}, consultaLibro = {};

        let usuario = null, libros = null, categoria = null, editorial = null, autor = null;
        if(dniUsuario){
            try{
                usuario = await Usuario.findOne({ DNI : dniUsuario});
                if(!usuario) return {message : 'No se encontró usuario'};
                consultaPrestamo.IDUsuario = usuario._id;
            }catch(error){throw new Error('Error al buscar usuario: ' + error.message);}
        }

        if(libroCategoria){
            try{
                categoria = await Categoria.findOne({ nombre :  libroCategoria});
                if(!categoria) return {message : 'No se encontró categoría'};
                consultaLibro.IDCategoria = categoria._id;
            }catch(error){throw new Error('Error al buscar categoría: ' + error.message);}
        }

        if(libroEditorial){
            try{
                editorial = await Editorial.findOne({ nombre :  libroEditorial});
                if(!editorial) return {message : 'No se encontró editorial'};
                consultaLibro.IDEditorial = editorial._id;
            }catch(error){throw new Error('Error al buscar editorial: ' + error.message);}
        }
        if(libroAutor){
            try{
                autor = await Autor.findOne({ nombre :  libroAutor});
                if(!autor) return {message : 'No se encontró autor'};
                consultaLibro.IDAutor = autor._id;
            }catch(error){throw new Error('Error al buscar autor: ' + error.message);}
        }

        if(libroNombre || libroCategoria || libroEditorial || libroAutor){
            if(libroNombre) consultaLibro.titulo = libroNombre;
            try{
                libros = await Libro.find(consultaLibro);
                if(libros.length == 0){ return {message : 'No se encontró libro'}; } 
                const idLibros = libros.map(libro => libro._id); 
                consultaPrestamo.IDLibro = {$in : idLibros};
            }catch(error){throw new Error('Error al buscar libro: ' + error.message);}
        }

        if(fecPrestInicio){
            const fecPrestInicioUTC = DateTime.fromISO(fecPrestInicio, { zone : 'utc' });
            consultaPrestamo.fechaSalida = {
                ...consultaPrestamo.fechaSalida,
                $gte : fecPrestInicioUTC.toISO()
            };
        }

        if(fecPrestFin){
            const fecPrestFinUTC = DateTime.fromISO(fecPrestFin, { zone : 'utc' });
            fecPrestFinUTC = fecPrestFinUTC.set({ hour : 23, minute : 59, second : 59, millisecond : 999 });
            consultaPrestamo.fechaSalida = {
                ...consultaPrestamo.fechaSalida,
                $lte : fecPrestFinUTC.toISO()
            };
        }
        
        if(fecDevInicio){
            const fecDevInicioUTC = DateTime.fromISO(fecDevInicio, { zone : 'utc' });
            consultaPrestamo.fechaMaxDevolucion = {
                ...consultaPrestamo.fechaMaxDevolucion,
                $gte : fecDevInicioUTC.toISO()};
        }
        if(fecDevFin){
            let fecDevFinUTC = DateTime.fromISO(fecDevFin, { zone : 'utc' });
            fecDevFinUTC = fecDevFinUTC.set({ hour : 23, minute : 59, second : 59, millisecond : 999 });
            consultaPrestamo.fechaMaxDevolucion = {
                ...consultaPrestamo.fechaMaxDevolucion,
                $lte : fecDevFinUTC.toISO()};
        }

        const prestamos = await Prestamo.find(consultaPrestamo);
        actualizarEstadoMulta(prestamos);
        return prestamos;
    }catch(error){
        throw new Error('Error al buscar préstamos: ' + error.message);
    }
}

export async function calcularMulta(dniUsuario){
    try{
        const usuario = await Usuario.findOne({ DNI: dniUsuario });
        if(!usuario) return { message : 'Usuario no encontrado', multa : 0 };
        
        const prestamos = await Prestamo.find({ IDUsuario : usuario._id });
        actualizarEstadoMulta(prestamos);
        const prestamosMulta = prestamos.filter(prestamo => prestamo.estadoPrestamo === 'Multa');

        const fechaActualUTC = DateTime.utc();

        let totalMulta = 0;
        let multa = 15;
        for(let prestamo of prestamosMulta){
            const itemFecMaxDevDateTime = DateTime.fromJSDate(prestamo.fechaMaxDevolucion, { zone: 'utc' });
            const diasRetraso = fechaActualUTC.diff(itemFecMaxDevDateTime, 'days').days;
            if(diasRetraso < 3) totalMulta += multa;
            else if(diasRetraso < 7) totalMulta += multa * 2;
            else totalMulta += multa * 3;
            
            if(prestamo.deterioro != 'NO'){
                const libro = await Libro.findById(prestamo.IDLibro);
                if(libro){
                    totalMulta += libro.precioLibro * (prestamo.deterioro == 'LEVE' ? 0.1 : 1);
                }
            }
        }

        return {prestamosMulta, multa : totalMulta};

    }catch(error){
        throw new Error("Error al calcular multa: " + error);
    }
}
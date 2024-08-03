import mongoose from "mongoose";

const EstadoUsuarioSchema = new mongoose.Schema({
    tipoUsuario: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    collection: 'EstadoDeUsuario',
    timestamps: true,
    versionKey: false
});

const EstadoUsuario = mongoose.model('EstadoUsuario', EstadoUsuarioSchema);

//Esta es una forma brusca de agregar los datos, pero es una forma de hacerlo
//Para que se carguen los datos, es necesario en el index importar este JS

// const statuses = [
//     { tipoUsuario: 'inhabilitado', descripcion: 'Usuario no puede acceder a servicios' },
//     { tipoUsuario: 'habilitado', descripcion: 'Usuario puede acceder a servicios' },
//     { tipoUsuario: 'despedido', descripcion: 'Trabajador no tiene relación laboral' },
//     { tipoUsuario: 'contratado', descripcion: 'Trabajador tiene relación laboral' },
//     { tipoUsuario: 'inactivo', descripcion: 'Trabajador no está activo' }
// ];


// EstadoUsuario.insertMany(statuses)
//     .then((docs) => {
//         console.log('Categories inserted:', docs);
//         mongoose.connection.close();
//     })
//     .catch((err) => {
//         console.error('Error inserting categories:', err);
//         mongoose.connection.close();
//     });

export default EstadoUsuario;
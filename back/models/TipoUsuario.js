import mongoose from "mongoose";

const TipoUsuarioSchema = new mongoose.Schema({
    tipoUsuario: {
        type: String,
        required: true
    }
}, {
    collection: 'TipoDeUsuario',
    timestamps: true,
    versionKey: false
});

const TipoUsuario = mongoose.model('TipoUsuario', TipoUsuarioSchema);

//Esta es una forma brusca de agregar los datos, pero es una forma de hacerlo
//Para que se carguen los datos, es necesario en el index importar este JS

// const categories = [
//     { tipoUsuario: "Estudiante" },
//     { tipoUsuario: "Profesor" },
//     { tipoUsuario: "Externo" },
//     { tipoUsuario: "Biblitecario" },
//     { tipoUsuario: "Gerente" },
//     { tipoUsuario: "Administrador" }
// ];


// TipoUsuario.insertMany(categories)
//     .then((docs) => {
//         console.log('Categories inserted:', docs);
//         mongoose.connection.close();
//     })
//     .catch((err) => {
//         console.error('Error inserting categories:', err);
//         mongoose.connection.close();
//     });

export default TipoUsuario;
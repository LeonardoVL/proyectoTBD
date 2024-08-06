import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    DNI: {
        type: String,
        required: true
    },
    IDTipoUsuario: {
        type: String,
        required: true
    },
    IDTipoEstado: {
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    reservasActivas: {
        type: Number,
        required: true
    }
}, {
    collection: 'Usuario',
    timestamps: true,
    versionKey: false
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;
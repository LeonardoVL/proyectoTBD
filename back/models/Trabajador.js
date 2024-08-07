import mongoose from "mongoose";

const TrabajadorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correoTrabajador: {
        type: String,
        required: true
    },
    inicioTurno: {
        type: Array,
        required: true
    },
    finTurno: {
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
    }
},{
    collection: 'Trabajador',
    timestamps: true,
    versionKey: false
});

const Trabajador = mongoose.model('Trabajador', TrabajadorSchema);

export default Trabajador;
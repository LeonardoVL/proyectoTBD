import mongoose from "mongoose";

const PrestamoSchema = new mongoose.Schema({
    IDLibro: {
        type: String,
        required: true
    },
    IDUsuario: {
        type: String,
        required: true
    },
    IDTrabajador: {
        type: String,
        required: true
    },
    fechaSalida: {
        type: Date,
        required: true
    },
    fechaMaxDevolucion: {
        type: Date,
        required: true
    },
    fechaDevolucion: {
        type: Date,
        required: true
    },
    estadoDevolucion: {
        type: String,
        required: true
    }
}, {
    collection: 'Prestamo',
    timestamps: true,
    versionKey: false
});

const Prestamo = mongoose.model('Prestamo', PrestamoSchema);

export default Prestamo;
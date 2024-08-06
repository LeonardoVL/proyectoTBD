import mongoose from "mongoose";

const AutorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    }
}, {
    collection: 'Autor',
    timestamps: true,
    versionKey: false
});

const Autor = mongoose.model('Autor', AutorSchema);

export default Autor;
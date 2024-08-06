import mongoose from "mongoose";

const LibroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    IDAutor: {
        type: String,
        required: true
    },
    IDCategoria: {
        type: String,
        required: true
    },
    IDEditorial: {
        type: String,
        required: true
    },
    anioPublicacion: {
        type: Date,
        required: true
    },
    ejemplaresTotales: {
        type: Number,
        required: true
    },
    edicion: {
        type: Number,
        required: true
    },
    numerosPaginas: {
        type: Number,
        required: true
    },
    precioLibro: {
        type: Number,
        required: true
    },
    estadoLibro: {
        type: String,
        required: true
    }
}, {
    collection: 'Libro',
    timestamps: true,
    versionKey: false
});

const Libro = mongoose.model('Libro', LibroSchema);

export default Libro;
import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: Array,
        required: true
    }
},{
    collection: 'Categoria',
    timestamps: true,
    versionKey: false
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

export default Categoria;
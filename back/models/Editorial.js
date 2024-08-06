import mongoose from "mongoose";

const EditorialSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    }
}, {
    collection: 'Editorial',
    timestamps: true,
    versionKey: false
});

const Editorial = mongoose.model('Editorial', EditorialSchema);

export default Editorial;
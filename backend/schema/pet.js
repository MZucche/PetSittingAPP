const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    petType: { type: String, required: true }, // Para que mascota es el servicio
    petName: { type: String, required: true }, // Que tipo de servicio es
    petAge: { type: Number, required: true }, // Experiencia en años
    petSize: { type: String, required: true }, // La frecuencia que estaría disponible
    user: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true},
});
 
module.exports = mongoose.model('Pet', postSchema);

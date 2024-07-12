// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    petType: { type: String, required: true }, // Para que mascota es el servicio
    serviceType: { type: String, required: true }, // Que tipo de servicio es
    experience: { type: Number, required: true }, // Experiencia en años
    availabilityFrequency: { type: [String], required: true }, // La frecuencia que estaría disponible
    availabilityDays: { type: [String] }, // La disponibilidad días (solo si frecuencia semanal)
    description: { type: String, required: true }, // Una breve descripción del servicio
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true},
    State: { type: String, default: 'Activa'},
    createdAt: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('Post', postSchema);

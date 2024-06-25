// backend/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    petType: { type: String, required: true }, // Para que mascota es el servicio
    serviceType: { type: String, required: true }, // Que tipo de servicio es
    experience: { type: Number, required: true }, // Experiencia en años
    availabilityFrequency: { type: String, required: true }, // La frecuencia que estaría disponible
    availabilityDays: { type: [String] }, // La disponibilidad días (solo si frecuencia semanal)
    availabilityDates: {
        startDate: { type: Date }, // Fecha de inicio
        endDate: { type: Date } // Fecha de fin
    },
    description: { type: String, required: true }, // Una breve descripción del servicio
    price: { type: Number, required: true },
    user: { type: Object, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  post: { type: Object, required: true },
  message: { type: String, required: true },
  availability: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stat: { type: String, default: 'Solicitado' },
  createdAt: { type: Date, default: Date.now },
  review: {
    message: String,
    rating: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
});

module.exports = mongoose.model('Booking', bookingSchema);

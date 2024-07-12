const express = require('express');
const router = express.Router();
const User = require('../schema/user');
const Booking = require('../schema/booking');
const authenticate = require('../auth/authenticate');


console.log('Definiendo ruta /update-review');
router.put('/update-review', authenticate, async (req, res) => {
  try {
    console.log('Recibida solicitud para actualizar reseña:', req.body);
    const { bookingId, userId, rating, review } = req.body;
    
    console.log('Usuario autenticado:', req.user.id);
    console.log('Usuario de la reseña:', userId);


    console.log('Buscando usuario...');
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log('Usuario encontrado:', user.username);

    console.log('Buscando reserva...');
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    console.log('Reserva encontrada:', booking._id);

    console.log('Creando nueva reseña...');
    const newReview = {
      message: review,
      rating: Number(rating),
      user: req.user.id
    };
    
    console.log('Agregando nueva reseña...');
    user.reviews = user.reviews.filter(review => review.message && review.rating && review.user);
    user.reviews.push(newReview);

    console.log('Recalculando rating...');
    const totalRating = user.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const newAverageRating = (totalRating + Number(rating)) / (user.reviews.length + 1);
    user.rating = isNaN(newAverageRating) ? user.rating : newAverageRating;

    console.log('Guardando usuario...');
    await user.save();

    console.log('Actualizando reserva...');
    booking.review = newReview;
    await booking.save();

    console.log('Reseña actualizada con éxito');
    res.json({ message: 'Reseña actualizada con éxito', review: newReview });
  } catch (error) {
    console.error('Error al actualizar la reseña:', error);
    res.status(500).json({ message: 'Error al actualizar la reseña', error: error.message });
  }
});


router.put('/', authenticate, async (req, res) => {
    try {
        const { name, surname, username, password, address, zone } = req.body;
        const userId = req.user.id; // Asumiendo que el middleware de autenticación agrega el id del usuario al objeto req

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar los campos
        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.username = username || user.username;
        user.address = address || user.address;
        user.zone = zone || user.zone;

        await user.save();

        res.json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
});


module.exports = router;
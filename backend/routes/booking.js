const express = require('express');
const router = express.Router();
const Booking = require('../schema/booking');
const mongoose = require('mongoose');
const User = require('../schema/user');


// Ruta para crear una nueva reserva
router.post('/', async (req, res) => {
  const {
    post,
    message,
    availability,
    user,
    stat,
    review,
    createdAt
  } = req.body;

  console.log('Received booking data:', req.body);

  try {
    const newBooking = new Booking({
      post,
    message,
    availability,
    user,
    stat,
    review,
    createdAt
    });

    await newBooking.save();

    res.status(200).json({
      message: 'La reserva se creó con éxito',
      post: newBooking
    });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({
      message: 'Error creando la reserva',
      error: error.message
    });
  }
});


// Endpoint para obtener todas las reservas
router.get('/bookings/user-posts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({ 'post.user': userId })
      .populate('user')
      .populate('post');

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

router.get('/bookings/user-requested/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Encontrar las reservas realizadas por el usuario
    const bookings = await Booking.find({ user: userId });

    // Buscar la información adicional de cada post y su usuario
    const bookingsWithPostUser = await Promise.all(
      bookings.map(async booking => {
        const postUserId = booking.post.user;
        const postUser = await User.findById(postUserId, 'name surname address rating');
        booking.post.userDetails = postUser; // Añadir los detalles del usuario al post
        return booking;
      })
    );

    res.status(200).json(bookingsWithPostUser);
  } catch (error) {
    console.error('Error al obtener las reservas:', error);
    res.status(500).json({ error: 'Error al obtener las reservas' });
  }
});

module.exports = router;

router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Opcional: Verificar si el usuario tiene permiso para actualizar esta reserva
    // if (booking.user.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: 'No tienes permiso para actualizar esta reserva' });
    // }

    booking.stat = status;
    await booking.save();

    res.status(200).json({ message: 'Estado de la reserva actualizado con éxito', booking });
  } catch (error) {
    console.error('Error al actualizar el estado de la reserva:', error);
    res.status(500).json({ message: 'Error al actualizar el estado de la reserva' });
  }
});



module.exports = router;

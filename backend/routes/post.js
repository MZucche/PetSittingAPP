const express = require('express');
const router = express.Router();
const Post = require('../schema/post');

// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  const {
    petType,
    serviceType,
    experience,
    availabilityFrequency,
    availabilityDays,
    availabilityDates,
    price,
    description,
    user
  } = req.body;

  try {
    const newPost = new Post({
      petType,
      serviceType,
      experience,
      availabilityFrequency,
      availabilityDays,
      availabilityDates,
      price,
      description,
      user,
    });

    await newPost.save();

    // Envía una respuesta de éxito
    res.status(200).json({
      message: 'La publicación se creó con éxito',
      post: newPost
    });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    // Envía una respuesta de error
    res.status(500).json({
      message: 'Error creando la publicación',
      error: error.message
    });
  }

  
});

module.exports = router;
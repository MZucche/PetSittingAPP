const express = require('express');
const router = express.Router();
const Review = require('../schema/review');

// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  const {
    comment,
    rating,
    userFrom,
    userTo
  } = req.body;

  try {
    const newReview = new Review({
        comment,
        rating,
        userFrom,
        userTo
    });

    await newReview.save();

    res.status(200).json({
      message: 'La publicación se creó con éxito',
      post: newReview
    });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({
      message: 'Error creando la publicación',
      error: error.message
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Pet = require('../schema/pet');

// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  const {
    petType,
    petName,
    petAge,
    petSize,
    user
  } = req.body;

  try {
    const newPet = new Pet({
        petType,
        petName,
        petAge,
        petSize,
        user
    });

    await newPet.save();

    res.status(200).json({
      message: 'La publicación se creó con éxito',
      post: newPet
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

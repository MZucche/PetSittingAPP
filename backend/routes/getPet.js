const express = require('express');
const router = express.Router();
const Pet = require('../schema/pet'); // Asegúrate de que la ruta al modelo Pet sea correcta

// Endpoint para obtener todas las mascotas de un usuario específico
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const pets = await Pet.find({ user: userId }, {
      petType: 1,
      petName: 1,
      petAge: 1,
      petSize: 1,
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

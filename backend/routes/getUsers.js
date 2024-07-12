const express = require('express');
const router = express.Router();
const User = require('../schema/user'); // Importa el modelo Post

// Endpoint para obtener todos los servicios de mascotas
router.get('/', async (req, res) => {
  try {
    const services = await User.find({}, {
      _id: 1,
      name: 1,
      surname: 1,
      zone: 1,
      rating: 1,
      reviews: 1,
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

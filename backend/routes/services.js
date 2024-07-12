const express = require('express');
const router = express.Router();
const Post = require('../schema/post'); // Importa el modelo Post

// Endpoint para obtener todos los servicios de mascotas
router.get('/', async (req, res) => {
  try {
    const services = await Post.find({}, {
      petType: 1,
      serviceType: 1,
      experience: 1,
      availabilityFrequency: 1,
      availabilityDays: 1,
      State: 1,
      description: 1,
      price: 1,
      user: 1,
      createdAt: 1,
      _id: 1 // 
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

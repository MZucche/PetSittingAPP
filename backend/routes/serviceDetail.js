const express = require('express');
const router = express.Router();
const Post = require('../schema/post');

router.get('/:id', async (req, res) => {
  try {
    const service = await Post.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error al buscar el servicio:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

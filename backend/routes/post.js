const express = require('express');
const router = express.Router();
const Post = require('../schema/post');
const authenticate = require('../auth/authenticate'); // Middleware para autenticar el token


// Ruta para crear una nueva publicación
router.post('/', async (req, res) => {
  const {
    petType,
    serviceType,
    experience,
    availabilityFrequency,
    availabilityDays,
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
      price,
      description,
      user,
    });

    await newPost.save();

    res.status(200).json({
      message: 'La publicación se creó con éxito',
      post: newPost
    });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({
      message: 'Error creando la publicación',
      error: error.message
    });
  }
});

router.use(authenticate);

// Ruta para obtener los posts del usuario en sesión
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Busca los posts que pertenecen al usuario con el ID proporcionado
    const posts = await Post.find({ 'user': userId });

    res.status(200).json(posts); // Devuelve los posts encontrados
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
});

module.exports = router;

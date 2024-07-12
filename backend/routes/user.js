const { jsonResponse } = require("../lib/jsonResponse");
const User = require('../schema/user');
const express = require('express');
const router = express.Router();
const authenticate = require('../auth/authenticate'); // Middleware para autenticar el token

router.get("/", (req,res) => {
    res.status(200).json(jsonResponse(200, req.user));
});

router.get('/users/:id', authenticate, async (req, res) => {
  try {
      const user = await User.findById(req.params.id)
          .populate({
              path: 'reviews',
              populate: { path: 'user', select: 'name' }
          });

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el usuario' });
  }
});

router.get('/users/:userId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log('Usuario encontrado:', user);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
      res.status(500).json({ error: 'Error al obtener los detalles del usuario' });
    }
  });




module.exports= router;
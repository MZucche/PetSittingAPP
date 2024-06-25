const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user'); // Asegúrate de que User esté importado correctamente
const Token = require('../schema/token'); // Asegúrate de que Token esté importado correctamente
const { JWT_SECRET } = process.env;

router.post('/', async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado.' });
    }
    
    user.password = password;

    // Guardar usuario actualizado
    await user.save();

    // Eliminar el token utilizado
    await Token.findOneAndDelete({ token });

    res.json({ message: 'Contraseña restablecida exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al restablecer la contraseña.' });
  }
});

module.exports = router;

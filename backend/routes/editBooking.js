const express = require('express');
const router = express.Router();
const Booking = require('../schema/booking'); // Ajusta la ruta según tu estructura
const authenticate = require('../auth/authenticate'); // Middleware para autenticar el token

router.put('/', authenticate, async (req, res) => {
    try {
        const { stat } = req.body;
        const userId = req.user.id; // Asumiendo que el middleware de autenticación agrega el id del usuario al objeto req

        const booking = await Booking.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Actualizar los campos
        booking.stat = stat || booking.stat;

        await booking.save();

        res.json({ message: 'Perfil actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
});

module.exports = router;
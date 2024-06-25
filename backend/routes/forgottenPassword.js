require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../schema/user'); // Asegúrate de que la ruta esté correcta

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ body: { error: 'El correo electrónico no está registrado.' } });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${process.env.CLIENT_URL}/resetpassword/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ body: { error: 'Ocurrió un error al enviar el correo.' } });
    }
    res.status(200).json({ body: { message: 'Correo enviado.' } });
  });
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const authenticate = require('./auth/authenticate');
const UserSchema = require('./schema/user');



require('dotenv').config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");
}

main().catch(console.error);

app.use('/api/user', require('./routes/editProfile'));

app.use('/api/user', authenticate, require('./routes/editProfile'));

app.use((req, res, next) => {
  console.log(`Recibida solicitud: ${req.method} ${req.url}`);
  next();
});

app.use('/api/posts', require('./routes/post'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api' , require('./routes/booking'))
app.use('/api' , require('./routes/user'))
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/pet', require('./routes/pet'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/editprofile', require('./routes/editProfile'));
app.use('/api/editbooking', require('./routes/editBooking'));
app.use('/api/posts', require('./routes/editPost'));
app.use('/api/getpet', require('./routes/getPet'));
app.use('/api/deletepet', require('./routes/deletePet'));

app.use('/api/services', require('./routes/services'));
app.use('/api/getusers', require('./routes/getUsers'));
app.use('/api/user', authenticate, require('./routes/user'));
app.use('/api/post', authenticate, require('./routes/post'));
app.use('/api/todos', authenticate, require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/forgottenpassword', require('./routes/forgottenPassword'));
app.use('/api/resetpassword', require('./routes/resetPassword'));
app.use('/api/signout', require('./routes/signout'));
app.use('/api/services/:id', require('./routes/serviceDetail'));
app.use('/api/users/:id', require('./routes/userDetail'));

app.use('/api/user', require('./routes/editProfile'));

app.use('/api/user', authenticate, require('./routes/editProfile'));

console.log('Rutas de usuario cargadas');


app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/api/services/:id', async (req, res) => {
    try {
      const service = await Post.findById(req.params.id).populate('user');
      if (!service) {
        return res.status(404).send({ message: 'Service not found' });
      }
      res.send(service);
    } catch (error) {
      console.error(error); // Loguear el error
      res.status(500).send({ message: 'Server error' });
    }
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/api/user', (req, res, next) => {
  console.log('Solicitud recibida en /api/user');
  next();
}, require ('./routes/user'));

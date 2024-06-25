const express = require ('express');
const cors = require ('cors');
const app = express();
const mongoose = require('mongoose');
const authenticate = require ("./auth/authenticate");

require ('dotenv').config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Connected to MongoDsB")
}

main().catch(console.error);

app.use("/api/signup", require("./routes/signup"));
app.use('/api/login', require('./routes/login'));
app.use('/api/user', authenticate, require('./routes/user'));
app.use('/api/post', authenticate, require('./routes/post'));
app.use('/api/todos', authenticate, require('./routes/todos'));
app.use('/api/refresh-token', require('./routes/refreshToken'));
app.use('/api/forgottenpassword', require('./routes/forgottenPassword'));
app.use('/api/resetpassword', require('./routes/resetPassword'));
app.use('/api/signout', require('./routes/signout'));


app.get("/", (req, res) => {
    res.send ("Hello World!");
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateRefreshToken, generateAccessToken } = require('../auth/generateTokens');
const getUserInfo = require('../lib/getUserInfo');
const Token = require('../schema/token');

const reviewSchema = new mongoose.Schema({
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  }, { timestamps: true });
  
  const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      surname: { type: String, required: true },
      address: { type: String, required: true },
      zone: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      rating: { type: Number, default: 5, min: 0, max: 5 },
      reviews: [reviewSchema]
    });

UserSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.usernameExists = async function (username) {
    const result = await mongoose.model('User').find({ username });
    return result.length > 0;
};

UserSchema.methods.emailExists = async function (email) {
    const result = await mongoose.model('User').find({ email });
    return result.length > 0;
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.createAccessToken = function () {
    return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
};

// Exportar el modelo User con el Schema configurado
module.exports = mongoose.model('User', UserSchema);

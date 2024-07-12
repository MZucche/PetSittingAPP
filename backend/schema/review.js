const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    comment: { type: String, required: true }, 
    rating: { type: Number, required: true },
    userFrom: { type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true},
    userTo: {type: mongoose.Schema.Types.ObjectId , required: true}
});
 
module.exports = mongoose.model('Review', postSchema);

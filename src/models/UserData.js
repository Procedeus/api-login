const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    gift: String,
    gifted: String
});

module.exports = mongoose.model('Users', UserSchema);
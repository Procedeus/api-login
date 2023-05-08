const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('Accounts', AccountSchema);
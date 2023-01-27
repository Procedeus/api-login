const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('Accounts', AccountSchema);
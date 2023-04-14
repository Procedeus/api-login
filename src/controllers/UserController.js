const Accounts = require('../models/AccountData');
const jwt = require('jsonwebtoken');

module.exports = {

    async signin(request, response){
        const {username, password} = request.body;
        const account = await Accounts.find({username: username, password: password});
        if(account.length > 0){
            const secretKey = 'meu-segredo-feito';
            const payload = {
                userId: account._id,
                username: account.username
            }
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return response.json({token});
        }
        return response.status(404).json({error: "Email e/ou senha incorretos"});
    },
    async signup(request, response){
        const { username, password, email } = request.body;
        const account = await Accounts.find({username: username});
        if(account.length)
            return response.status(403).json({error: "Usuário existente."})
        const accountCreated = await Accounts.create({
            username,
            password,
            email
        });
        return response.json(accountCreated);
    }
}
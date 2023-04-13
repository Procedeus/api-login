const Accounts = require('../models/AccountData');

module.exports = {

    async signin(request, response){
        const {username, password} = request.body;
        const account = await Accounts.find({username: username, password: password});
        return response.json(account);
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
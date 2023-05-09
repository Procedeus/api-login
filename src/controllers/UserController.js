const Accounts = require('../models/AccountData');
const jwt = require('jsonwebtoken');

module.exports = {

    async login(request, response){
        const {username, password} = request.body;
        const account = await Accounts.find({username: username, password: password});
        if(account.length > 0){
            const secretKey = 'meu-segredo-feito';
            const payload = {
                userId: account[0]._id
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
            return response.json({token});
        }
        else{
            response.status(401).json({error: "Usuário e/ou Senha incorretos"})
        }
    },
    async signup(request, response){
        const { username, password, email } = request.body;
        const account = await Accounts.find({username: username});
        if(account.length)
            return response.status(409).json({error: "Usuário existente."})
        const accountCreated = await Accounts.create({
            username,
            password,
            email
        });
        return response.json(accountCreated);
    },
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token === 'null') {
            return res.status(401).json({ error: 'Token não encontrado' });
        }
        console.log(token);
        const secretKey = 'meu-segredo-feito';
        try {
          const decodedToken = jwt.verify(token, secretKey);
          req.decodedToken = decodedToken;
          next();
        } catch (error) {
          return res.status(400).json({ error: 'Token Invalido' });
        }
    },
    async searchUser(req, res){
        const userId = req.decodedToken.userId;
        const account = await Accounts.findById(userId);
        return res.json(account);
    }
}
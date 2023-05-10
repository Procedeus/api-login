const Accounts = require('../models/AccountData');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    createToken(id){
        const secretKey = process.env.JWT_SECRETKEY;
        const payload = {
            userId: id
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
        return token;
    },
    async login(request, response){
        const {username, password} = request.body;
        const account = await Accounts.find({username: username, password: password});
        if(account.length > 0){
            const token = createToken(account[0]._id);
            return response.json({token});
        }
        else{
            response.status(401).json({error: "Usuário e/ou Senha incorretos"})
        }
    },
    async signup(request, response){
        const { username, password, email } = request.body;
        const account = await Accounts.find({username: username});
        if(account.length){
            return response.status(409).json({error: "Usuário existente."})
        }
        const accountCreated = await Accounts.create({
            username,
            password,
            email
        });
        const token = createToken(accountCreated._id);
        return response.json(token);
    },
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token === 'null') {
            return res.status(401).json({ error: 'Token não encontrado' });
        }
        const secretKey = process.env.JWT_SECRETKEY;
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
        return res.json(account.username);
    }
}
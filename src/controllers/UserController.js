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
            console.log(payload);
            const token = jwt.sign(payload, secretKey, { expiresIn: '7d' });
            return response.json({token});
        }
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
        return login(accountCreated);
    },
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token not found' });
        }
        const secretKey = 'meu-segredo-feito';
        try {
            const decodedToken = jwt.verify(token, secretKey);
            req.decodedToken = decodedToken;
            next();
          } catch (error) {
            res.status(400).json({ error: 'Invalid token' });
          }
    }
}
const Users = require('../models/UserData');

module.exports = {

    async read(request, response){
        const userList = await Users.find();
        return response.json(userList);
    },
    async readGift(request, response){
        const userList = await Users.find({ gift: ''}).exec();
        return response.json(userList);
    },

    async readGifted(request, response){
        const userList = await Users.find({ gifted: ''}).exec();
        return response.json(userList);
    },

    async create(request, response){
        const { name, email } = request.body;

        if(!name || !email){
            return response.status(400).json({error: "Nome/Email não informado."})
        }

        const userCreated = await Users.create({
            name,
            email,
            gift: '',
            gifted: ''
        });
        return response.json(userCreated);
    },

    async update(request, response){
        const { id } = request.params;
        const { name, email } = request.body;
        const userUpdated = await Users.findOne({ _id: id});
        if(userUpdated){
            userUpdated.name = name;
            userUpdated.email = email;
            await userUpdated.save();
        }

        return response.json(userUpdated);
    },

    async gift(request, response){
        const { id } = request.params;
        const { gift } = request.body;
        const userUpdated = await Users.findOne({ _id: id});
        if(userUpdated){
            userUpdated.gift = gift;
            await userUpdated.save();
        }

        return response.json(userUpdated);
    },

    async gifted(request, response){
        const { id } = request.params;
        const { gifted } = request.body;
        const userUpdated = await Users.findOne({ _id: id});
        if(userUpdated){
            userUpdated.gifted = gifted;
            await userUpdated.save();
        }

        return response.json(userUpdated);
    },

    async delete(request, response){
        const { id } = request.params;
        console.log(id);
        const userDeleted = await Users.findOneAndDelete({ _id: id});
        if(!userDeleted){
            return response.status(401).json({error: "Usuário não encontrado."});
        }
        return response.json(userDeleted);
    },
    async raffle(request, response){
        const { verif } = request.params;
        if(verif){
            const userList = await Users.find();
            var userModif = userList;
            var objects = [];
            var num, userRuffle;
            for(var i = userModif.length; i > 0; i--){
                num = Math.floor(Math.random() * i);
                userRuffle = userModif.at(num);
                userModif = userModif.filter(item => item.name !== userRuffle.name);
                objects.push(userRuffle);
            }
            for(var i = 0; i < userList.length; i++){
                if(objects[i].name == userList[i].name){
                    if(i < userList.length - 1){
                        userModif = objects[i + 1];
                        objects[i + 1]  = objects[i];
                        objects[i] = userModif; 
                    }
                    else if(i == userList.length - 1){
                        userModif = objects[i - 1];
                        objects[i - 1]  = objects[i];
                        objects[i] = userModif;
                    }
                }
            }
            for(var i = 0; i < userList.length; i++){
                const userUpdated = userList[i];
                userUpdated.gift = objects[i].name;
                userUpdated.save();
            }
            return response.json(userList);
        }
        else{
            return response.status(402).json({error: "Não foi possível sortear."});
        }
    }
}
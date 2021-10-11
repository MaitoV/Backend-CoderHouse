const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollection = 'users';
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
})

usersSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;

    next();
})

/*Metodo para el schema. metodo personalizado
userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}*/

const usersModel = mongoose.model(userCollection, usersSchema);
module.exports = usersModel;
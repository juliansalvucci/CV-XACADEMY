const userModel = require('../models').User
const bcrypt = require('bcrypt');

const getUser = async(userId) => {
    try {
        const user = await userModel.findByPk(userId, { include: { all: true } });
        return user
    } catch(error) {
        console.error('Could not get user!', error);
        throw error;
    }
}

const createUser = async(userBody) => {
    try {
        const hashPassword = await bcrypt.hash(userBody.password, 12);
        const newUser = await userModel.create({...userBody, password: hashPassword});
        return newUser;
    } catch(error) {
        console.error('Could not create a new user!', error);
        throw error;
    }
};

const validateUser = async(options) => {
    try {
        const user = await userModel.findOne({
            where: {
                email: options.user,
            }
        });
        const validPassword = await bcrypt.compare(options.password, user.password); 
        if(!validPassword) {
            return false;
        } else {
            console.log(`Valid password! ${options.password} == ${user.password}`);
        }
        return user;
    } catch(error) {
        console.error('Error when fetching user', error);
        throw error;
    }
};

module.exports = { getUser, createUser, validateUser };
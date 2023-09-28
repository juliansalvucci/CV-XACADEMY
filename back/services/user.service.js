const userModel = require('../models').User
const { Resume } = require('../models')

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
        const newUser = await userModel.create(userBody);
        return newUser;
    } catch(error) {
        console.error('Could not create a new user!', error);
        throw error;
    }
};

const validateUser = async(options) => {
    try {
        const user = await userModel.findAll({
            where: {
                email: options.user,
                password: options.password
            }
        });
        if(user.length !== 0) {
            return user;
        }
        return false;
    } catch(error) {
        console.error('Error when fetching user', error);
        throw error;
    }
};

module.exports = { getUser, createUser, validateUser };
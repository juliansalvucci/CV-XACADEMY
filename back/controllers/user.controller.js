
const { userService } = require('../services');

const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.userId);
        if(!user) {
            res.status(404).json({ action: 'getUser', error: `No user with id: ${req.params.userId} was found!`});
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ action: 'getUser', error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        if (!newUser) {
            res.status(404).json({ action: 'createUser', error: `Could not create a new user!`});
        } else {
            res.json(newUser);
        }
    } catch (error) {
        res.status(500).json({ action: 'createUser', error: error.message });
    }
}

module.exports = { getUser, createUser };
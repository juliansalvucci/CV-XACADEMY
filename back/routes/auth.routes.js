const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { SERVER_SECRET } = require('../middleware/auth-mdw');
const { userService } = require('../services');

router.post( '/', async (req, res) => {
    const { user, password } = req.body;
    const userFound = await userService.validateUser({ user, password });
    if(userFound) {
        const token = jwt.sign({ user }, SERVER_SECRET, {
            expiresIn: '10m',
        });
        return res.json({ token });
    }
    res.status(401).json({ error: 'Invalid User'});
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { userController } = require('../controllers')

router.post( '/register', userController.createUser );
router.get( '/:userId', userController.getUser );

module.exports = router;
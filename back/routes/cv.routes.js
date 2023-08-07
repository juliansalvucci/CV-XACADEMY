const express = require('express');
const router = express.Router();
const { cvController } = require('../controllers');

router.get( '/', cvController.getAllCvs ); // Obtiene todos los cvs.
router.get( '/:resumeId', cvController.getCv ); // Obtiene solo un cv por 'id'.

module.exports = router;
const express = require('express');
const router = express.Router();
const { cvController } = require('../controllers');

router.get( '/', cvController.getAllCvs ); // Obtiene todos los cvs.
router.get( '/:resumeId', cvController.getCv ); // Obtiene solo un cv por 'id'.
router.post( '/createCv', cvController.createCv ); // Crea un cv.
router.put( '/:resumeId', cvController.updateCv ); // Actualiza un cv por id.
router.delete( '/:resumeId', cvController.deleteCv );

module.exports = router;
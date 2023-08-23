const express = require('express');
const router = express.Router();
const { cvController, expController } = require('../controllers');

// Rutas para resume
router.get( '/', cvController.getAllCvs ); // Obtiene todos los cvs.
router.get( '/:resumeId', cvController.getCv ); // Obtiene solo un cv por 'id'.
router.post( '/', cvController.createCv ); // Crea un cv.
router.put( '/:resumeId', cvController.updateCv ); // Actualiza un cv por id.
router.delete( '/:resumeId', cvController.deleteCv );

// Rutas para resume -> experience
router.get( '/:resumeId/experience', expController.getAllExp );
router.get( '/:resumeId/experience/:expId', expController.getExp );
router.post( '/:resumeId/experience', expController.createExp);
router.put( '/:resumeId/experience/:expId', expController.updateExp);
router.delete( '/:resumeId/experience/:expId', expController.deleteExp);

module.exports = router;
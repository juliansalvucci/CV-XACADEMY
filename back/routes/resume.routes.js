const express = require('express');
const router = express.Router();
const { resumeController, expController } = require('../controllers');

// Rutas para resume
router.get( '/', resumeController.getAllResumes ); // Obtiene todos los cvs.
router.get( '/:resumeId', resumeController.getResume ); // Obtiene solo un cv por 'id'.
router.post( '/', resumeController.createResume ); // Crea un cv.
router.put( '/:resumeId', resumeController.updateResume ); // Actualiza un cv por id.
router.delete( '/:resumeId', resumeController.deleteResume );

// Rutas para resume -> experience
router.get( '/:resumeId/experience', expController.getAllExp );
router.get( '/:resumeId/experience/:expId', expController.getExp );
router.post( '/:resumeId/experience', expController.createExp);
router.put( '/:resumeId/experience/:expId', expController.updateExp);
router.delete( '/:resumeId/experience/:expId', expController.deleteExp);

module.exports = router;
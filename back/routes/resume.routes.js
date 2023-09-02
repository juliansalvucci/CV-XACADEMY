const express = require('express');
const router = express.Router();
const { resumeController, expController, educationController, projectController } = require('../controllers');

// Rutas para resume
router.get( '/', resumeController.getAllResumes ); // Obtiene todos los cvs.
router.get( '/:resumeId', resumeController.getResume ); // Obtiene solo un cv por 'id'.
router.post( '/', resumeController.createResume ); // Crea un cv.
router.put( '/:resumeId', resumeController.updateResume ); // Actualiza un cv por id.
router.delete( '/:resumeId', resumeController.deleteResume );

// Rutas para resume -> Experience
router.get( '/:resumeId/experience', expController.getAllExp );
router.get( '/:resumeId/experience/:expId', expController.getExp );
router.post( '/:resumeId/experience', expController.createExp);
router.put( '/:resumeId/experience/:expId', expController.updateExp);
router.delete( '/:resumeId/experience/:expId', expController.deleteExp);

// Rutas para resume -> Education
router.get( '/:resumeId/education', educationController.getAllEducations );
router.get( '/:resumeId/education/:educationId', educationController.getEducation );
router.post( '/:resumeId/education', educationController.createEducation );
router.put( '/:resumeId/education/:educationId', educationController.updateEducation );
router.delete( '/:resumeId/education/:educationId', educationController.deleteEducation );

// Rutas para resume -> Projects
router.get( '/:resumeId/project', projectController.getAllProjects );
router.get( '/:resumeId/project/:projectId', projectController.getProject );
router.post( '/:resumeId/project', projectController.createProject );
router.put( '/:resumeId/project/:projectId', projectController.updateProject );
router.delete( '/:resumeId/project/:projectId', projectController.deleteProject );



module.exports = router;
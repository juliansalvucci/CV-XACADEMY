const express = require('express');
const router = express.Router();
const { resumeController, expController, educationController, projectController, skillController } = require('../controllers');
const { jwtValidMDW } = require('../middleware/auth-mdw');

// Test
router.get( '/test', jwtValidMDW, async (req, res) => {
    console.log(req.user);
    res.json(req.user)
})

// Rutas para resume
router.get( '/', jwtValidMDW, resumeController.getAllResumes ); // Obtiene todos los cvs.
router.get( '/:resumeId', jwtValidMDW, resumeController.getResume ); // Obtiene solo un cv por 'id'.
router.post( '/', jwtValidMDW, resumeController.createResume ); // Crea un cv.
router.put( '/:resumeId', jwtValidMDW, resumeController.updateResume ); // Actualiza un cv por id.
router.delete( '/:resumeId', jwtValidMDW, resumeController.deleteResume );

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

// Rutas para resume -> Project
router.get( '/:resumeId/project', projectController.getAllProjects );
router.get( '/:resumeId/project/:projectId', projectController.getProject );
router.post( '/:resumeId/project', projectController.createProject );
router.put( '/:resumeId/project/:projectId', projectController.updateProject );
router.delete( '/:resumeId/project/:projectId', projectController.deleteProject );

// Rutas para resume -> Skill
router.get( '/:resumeId/skill', skillController.getAllSkills );
router.get( '/:resumeId/skill/:skillId', skillController.getSkill );
router.post( '/:resumeId/skill', skillController.createSkill );
router.put( '/:resumeId/skill/:skillId', skillController.updateSkill );
router.delete( '/:resumeId/skill/:skillId', skillController.deleteSkill );

module.exports = router;
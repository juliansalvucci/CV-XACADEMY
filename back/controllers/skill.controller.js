const { skillService, resumeService } = require('../services');

const getAllSkills = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getAllSkill', error: `Can not get an skill on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exps = await skillService.getAllSkills(req.params.resumeId);
            if(!exps) { 
                res.status(404).json({ action: 'getAllSkill', error: 'Could not get all skills!'});
            } else {
                res.json(exps);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllSkill', error: error.message });
    }  
}

const getSkill = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getSkill', error: `Can not get skill on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const skill = await skillService.getSkill(req.params.resumeId, req.params.skillId);
            if(!skill) {
                res.status(404).json({ action: 'getSkill', error: `Skill with id: ${req.params.skillId} does not exist`});
            } else {
                res.json(skill);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const createSkill = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'createSkill', error: `Can not create skill on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const newSkill = await skillService.createSkill(req.params.resumeId, req.body);
            res.json(newSkill);
        }
    } catch(error) {
        res.status(500).json({ action: 'createSkill', error: error.message });
    }
}

const updateSkill = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'updateSkill', error: `Can not update skill on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else {
            const skill = await skillService.getSkill(req.params.resumeId, req.params.skillId); 
            if(!skill) {
                res.status(404).json({ action: 'updateSkill', error: `Skill with id: ${req.params.skillId} does not exist`})
            } else {
                const skillToUpdate = await skillService.updateSkill(req.params.resumeId, req.params.skillId, req.body);
                res.json(skillToUpdate);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'updateSkill', error: error.message });
    }
}

const deleteSkill = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'deleteSkill', error: `Can not delete skill on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else { 
            const expToDelete = await skillService.deleteSkill(req.params.resumeId, req.params.skillId);
            if(expToDelete) {
                res.json({ message: `Skill with id ${req.params.skillId} was successfuly deleted!` });
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'deleteSkill', error: error.message });
    }
}

module.exports = { getAllSkills, getSkill, createSkill, updateSkill, deleteSkill };
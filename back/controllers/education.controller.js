const { educationService ,resumeService } = require('../services');

const getAllEducations = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getAllEducation', error: `Can not get an education on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exps = await educationService.getAllEducations(req.params.resumeId);
            if(!exps) { 
                res.status(404).json({ action: 'getAllEducation', error: 'Could not get all educations!'});
            } else {
                res.json(exps);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllEducation', error: error.message });
    }  
}

const getEducation = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getEducation', error: `Can not get education on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exp = await educationService.getEducation(req.params.resumeId, req.params.educationId);
            if(!exp) {
                res.status(404).json({ action: 'getEducation', error: `Could not get education with id ${req.params.resumeId}`});
            } else {
                res.json(exp);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const createEducation = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'createEducation', error: `Can not create education on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const newEducation = await educationService.createEducation(req.params.resumeId, req.body);
            res.json(newEducation);
        }
    } catch(error) {
        res.status(500).json({ action: 'createEducation', error: error.message });
    }
}

const updateEducation = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'updateEducation', error: `Can not update education on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else {
            const educationToUpdate = await educationService.updateEducation(req.params.resumeId, req.params.educationId, req.body);
            res.json(educationToUpdate);
        }
    } catch(error) {
        res.status(500).json({ action: 'updateEducation', error: error.message });
    }
}

const deleteEducation = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'deleteEducation', error: `Can not delete education on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else { 
            const expToDelete = await educationService.deleteEducation(req.params.resumeId, req.params.educationId);
            if(expToDelete) {
                res.json({ message: `Education with id ${req.params.educationId} was successfuly deleted!` });
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'deleteEducation', error: error.message });
    }
}

module.exports = { getAllEducations, getEducation, createEducation, updateEducation, deleteEducation };
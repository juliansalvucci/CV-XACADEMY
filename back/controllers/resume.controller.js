const { resumeService } = require('../services');

const getAllResumes = async(req, res) => {
    try {
        const resumes = await resumeService.getAllResumes(); // Llama a la funcion en el service para obtener los resumes.

        if(!resumes) { // Si no encuentra resumes...
            res.status(404).json({ action: 'getAllResumes', error: 'No resumes Found!' });
        } else { // Si los encuentra, mostrarlos.
            res.json(resumes);
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllResumes', error: error.message});
    }
        
};

const getResume = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Le pasamos el 'id' que pedimos en el router.
        if(!resume) {
            res.status(404).json({ action: 'getResume', error: `Resume with id ${req.params.resumeId} does not exist!`});
        } else {
            res.json(resume);
        }
    } catch(error) {
        res.status(500).json({ action: 'getResume', error: error.message });
    }
}

const createResume = async(req, res) => {
    try {
        const resumeToCreate = await resumeService.createResume(req.body);
        res.json(resumeToCreate);
    } catch(error) {
        res.status(500).json({ action: 'createResume', error: error.message });
    }
}

const updateResume = async(req, res) => {
    try {
        const resumeToUpdate = await resumeService.updateResume(req.body, req.params.resumeId);
        if(!resumeToUpdate) {
            res.status(404).json({ action: 'updateResume', error: `Resume with id ${req.params.resumeId} does not exist!` });
        } else {
            res.json(resumeToUpdate);
        }
    } catch(error) {
        res.status(500).json({ action: 'updateResume', error: error.message });
    }
}

const deleteResume = async(req, res) => {
    try {
        const resumeToDelete = await resumeService.deleteResume(req.params.resumeId);
        if(!resumeToDelete) {
            res.status(404).json({ action: 'deleteResume', error: `Resume with id ${req.params.resumeId} does not exist, can't delete a resume that does not exist!` });
        } else {
            res.json(resumeToDelete);
        }
    } catch(error) {
        res.status(500).json({ action: 'updateResume', error: error.message });
    }
}

module.exports = { getAllResumes, getResume, createResume, updateResume, deleteResume };
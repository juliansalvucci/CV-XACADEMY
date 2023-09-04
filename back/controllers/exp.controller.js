const { expService, resumeService } = require('../services');

const getAllExp = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getAllExp', error: `Can not get a work experience on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exps = await expService.getAllExp(req.params.resumeId);
            if(!exps) { 
                res.status(404).json({ action: 'getAllExp', error: 'Could not get all work experiences!'});
            } else {
                res.json(exps);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const getExp = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getExp', error: `Can not get a work experience on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exp = await expService.getExp(req.params.resumeId, req.params.expId);
            if(!exp) {
                res.status(404).json({ action: 'getExp', error: `Could not get work experiences with id ${req.params.resumeId}`});
            } else {
                res.json(exp);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const createExp = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'createExp', error: `Can not create a work experience on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const newExp = await expService.createExp(req.params.resumeId, req.body);
            res.json(newExp);
        }
    } catch(error) {
        res.status(500).json({ action: 'createExp', error: error.message });
    }
}

const updateExp = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'updateExp', error: `Can not update a work experience on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else {
            const exp = await expService.getExp(req.params.resumeId, req.params.expId);
            if(!exp) {
                res.status(404).json({ action: 'updateExp', error: `Work experience with id: ${req.params.expId}, does not exist!`});
            } else {
                const expToUpdate = await expService.updateExp(req.params.resumeId, req.params.expId, req.body);
                res.json(expToUpdate);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'updateExp', error: error.message });
    }
}

const deleteExp = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'deleteExp', error: `Can not delete a work experience on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else { 
            const expToDelete = await expService.deleteExp(req.params.resumeId, req.params.expId);
            if(expToDelete) {
                res.json({ message: `Experience with id ${req.params.expId} was successfuly deleted!` });
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'deleteExp', error: error.message });
    }
}

module.exports = { getAllExp, getExp, createExp, updateExp, deleteExp };
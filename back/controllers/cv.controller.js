const { cvService } = require('../services');

const getAllCvs = async(req, res) => {
    try {
        const cvs = await cvService.getAllCvs(); // Llama a la funcion en el service para obtener los cvs.

        if(!cvs) { // Si no encuentra cvs...
            res.status(404).json({ action: 'getAllCvs', error: 'No Cvs Found!' });
        } else { // Si los encuentra, mostrarlos.
            res.json(cvs);
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllCvs', error: error.message});
    }
        
};

const getCv = async(req, res) => {
    try {
        const cv = await cvService.getCv(req.params.resumeId); // Le pasamos el 'id' que pedimos en el router.
        if(!cv) {
            res.status(404).json({ action: 'getCv', error: `Cv with id ${req.params.resumeId} does not exist!`});
        } else {
            res.json(cv);
        }
    } catch(error) {
        res.status(500).json({ action: 'getCv', error: error.message });
    }
}

const createCv = async(req, res) => {
    try {
        const cvToCreate = await cvService.createCv(req.body);
        res.json(cvToCreate);
    } catch(error) {
        res.status(500).json({ action: 'createCv', error: error.message });
    }
}

const updateCv = async(req, res) => {
    try {
        const cvToUpdate = await cvService.updateCv(req.body, req.params.resumeId);
        if(!cvToUpdate) {
            res.status(404).json({ action: 'updateCv', error: `Cv with id ${req.params.resumeId} does not exist, can't update a cv that does not exist!` });
        } else {
            res.json(cvToUpdate);
        }
    } catch(error) {
        res.status(500).json({ action: 'updateCv', error: error.message });
    }
}

const deleteCv = async(req, res) => {
    try {
        const cvToDelete = await cvService.deleteCv(req.params.resumeId);
        if(!cvToDelete) {
            res.status(404).json({ action: 'deleteCv', error: `Cv with id ${req.params.resumeId} does not exist, can't delete a cv that does not exist!` });
        } else {
            res.json(cvToDelete);
        }
    } catch(error) {
        res.status(500).json({ action: 'updateCv', error: error.message });
    }
}

module.exports = { getAllCvs, getCv, createCv, updateCv, deleteCv };
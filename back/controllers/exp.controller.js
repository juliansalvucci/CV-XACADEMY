const { expService, cvService } = require('../services');

const getAllExp = async(req, res) => {
    try {
        const resume = await cvService.getCv(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getAllExp', error: `Can not get a work experience on a resume with id: ${req.params.resumeId}, because it does not exist!` });
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
        const resume = await cvService.getCv(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getExp', error: `Can not get a work experience on a resume with id: ${req.params.resumeId}, because it does not exist!` });
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
        const resume = await cvService.getCv(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'createExp', error: `Can not create a work experience on a resume with id: ${req.params.resumeId}, because it does not exist!` });
        } else { 
            const newExp = await expService.createExp(req.params.resumeId, req.body);
            res.json(newExp);
        }
    } catch(error) {
        res.status(500).json({ action: 'createExp', error: error.message });
    }
}

module.exports = { getAllExp, getExp, createExp };
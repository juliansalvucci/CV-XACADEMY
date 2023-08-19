const expService = require('../services');

const getAllExp = async(req, res) => {
    try {
        const exps = await expService.getAllExp(req.params.resumeId);

        if(!exps) {
            res.status(404).json({ action: 'getAllExp', error: 'Could not get all work experiences!'});
        } else {
            res.json(exps);
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const getExp = async(req, res) => {
    try {
        const exp = await expService.getExp(req.params.resumeId, req.params.expId);

        if(!exp) {
            res.status(404).json({ action: 'getExp', error: `Could not get work experiences with id ${req.params.resumeId}`});
        } else {
            res.json(exp);
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

module.exports = { getAllExp, getExp };
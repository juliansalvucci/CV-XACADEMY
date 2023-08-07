const { cvService } = require('../services');

const getAllCvs = async(req, res) => {

    const cvs = await cvService.getAllCvs(); // Llama a la funcion en el service para obtener los cvs.

    if(!cvs) { // Si no encuentra cvs...
        res.status(404).json({ action: 'getAllCvs', error: 'No Cvs Found!' });
    } else { // Si los encuentra, mostrarlos.
        res.json(cvs);
    }
};

const getCv = async(req, res) => {
    try {
        const cv = await cvService.getCv(req.params.resumeId) // Le pasamos el 'id' que pedimos en el router.
        if(!cv) {
            res.status(404).json({ action: 'getCv', error: `Resume with id ${req.params.resumeId} does not exist!`});
        } else {
            res.json(cv);
        }
    } catch(error) {
        res.status(500).json({ action: 'getCv', error: error.message });
    }
}

module.exports = { getAllCvs, getCv };
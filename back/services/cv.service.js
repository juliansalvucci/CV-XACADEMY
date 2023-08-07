const cvModel = require('../models').Resume;

const getAllCvs = async() => {
    try {
        const cvs = await cvModel.findAll();
        return cvs;
    } catch(error) {
        console.error('Could not get Cvs!', error);
        throw error;
    };
};

const getCv = async(resumeId) => {
    try {
        const cv = await cvModel.findByPk(resumeId);
        return cv;
    } catch(error) {
        console.error('Could not find cv!', error);
        throw error;
    }
};

module.exports = { getAllCvs, getCv};
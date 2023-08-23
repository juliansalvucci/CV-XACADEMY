const cvModel = require('../models').Resume;
const { Experience } = require('../models');

const getAllCvs = async() => {
    try {
        const cvs = await cvModel.findAll({ include: { model: Experience }});
        return cvs;
    } catch(error) {
        console.error('Could not get cvs!', error);
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

const createCv = async(cv) => {
    try {
        const newCv = await cvModel.create(cv);
        return newCv;
    } catch(error) {
        console.error('Could not create a new cv', error);
        throw error;
    }
}

const updateCv = async(cvBodyUpdated, resumeId) => {
    try {
        const cvToUpdate = await cvModel.findByPk(resumeId);
        if(cvToUpdate) {
            cvToUpdate.set({
                firstName: cvBodyUpdated.firstName,
                lastName: cvBodyUpdated.lastName,
                contactEmail: cvBodyUpdated.contactEmail,
                contactPhone: cvBodyUpdated.contactPhone,
                photoUrl: cvBodyUpdated.photoUrl
            });
            await cvToUpdate.save();
        }
        return cvToUpdate;
    } catch(error) {
        console.error('Could not find cv!', error);
        throw error;
    }
}

const deleteCv = async(resumeId) => {
    try {
        const cvToDelete = await cvModel.findByPk(resumeId);
        if(cvToDelete) {
            cvToDelete.destroy({
                where: {
                    id: resumeId
                }
            })
        }
    } catch(error) {
        console.error('Could not delete cv!', error);
        throw error;
    }
}

module.exports = { getAllCvs, getCv, createCv, updateCv, deleteCv };
const resumeModel = require('../models').Resume;
const { Experience } = require('../models');

const getAllResumes = async() => {
    try {
        const resumes = await resumeModel.findAll({ include: { model: Experience }});
        return resumes;
    } catch(error) {
        console.error('Could not get resumes!', error);
        throw error;
    };
};

const getResume = async(resumeId) => {
    try {
        const resume = await resumeModel.findByPk(resumeId);
        return resume;
    } catch(error) {
        console.error('Could not find resume!', error);
        throw error;
    }
};

const createResume = async(resume) => {
    try {
        const newresume = await resumeModel.create(resume);
        return newresume;
    } catch(error) {
        console.error('Could not create a new resume', error);
        throw error;
    }
}

const updateResume = async(resumeBodyUpdated, resumeId) => {
    try {
        const resumeToUpdate = await resumeModel.findByPk(resumeId);
        if(resumeToUpdate) {
            resumeToUpdate.set({
                firstName: resumeBodyUpdated.firstName,
                lastName: resumeBodyUpdated.lastName,
                contactEmail: resumeBodyUpdated.contactEmail,
                contactPhone: resumeBodyUpdated.contactPhone,
                photoUrl: resumeBodyUpdated.photoUrl
            });
            await resumeToUpdate.save();
        }
        return resumeToUpdate;
    } catch(error) {
        console.error('Could not find resume!', error);
        throw error;
    }
}

const deleteResume = async(resumeId) => {
    try {
        const resumeToDelete = await resumeModel.findByPk(resumeId);
        if(resumeToDelete) {
            resumeToDelete.destroy({
                where: {
                    id: resumeId
                }
            })
        }
    } catch(error) {
        console.error('Could not delete resume!', error);
        throw error;
    }
}

module.exports = { getAllResumes, getResume, createResume, updateResume, deleteResume };
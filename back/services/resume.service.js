const resumeModel = require('../models').Resume;
const userModel = require('../models').User;
const { Experience, Education, Project, Skill } = require('../models');

const getAllResumes = async() => {
    try {
        const resumes = await resumeModel.findAll({ include: [
            { model: Experience },
            { model: Education },
            { model: Project },
            { model: Skill }
        ]});
        return resumes;
    } catch(error) {
        console.error('Could not get resumes!', error);
        throw error;
    };
};

const getResume = async(resumeId) => {
    try {
        const resume = await resumeModel.findByPk(resumeId, { include: [
            { model: Experience },
            { model: Education },
            { model: Project },
            { model: Skill }
        ]});
        return resume;
    } catch(error) {
        console.error('Could not find resume!', error);
        throw error;
    }
};

const createResume = async(resume, userEmail) => {
    try {
        const userFound = await userModel.findAll(
            {
                where: {
                    email: userEmail.user
                }
            }    
        );
        if(userFound.length !== 0) {
            const newResume = await resumeModel.create({...resume, userId: userFound[0].id});
            return newResume;
        } else {
            throw new error('Could not find user!');
        }
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
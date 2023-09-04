const educationModel = require('../models').Education;

const getAllEducations = async(resumeId) => {
    try {
        const exps = await educationModel.findAll(
            {
                where: {
                    resumeId: resumeId
                }
            }
        );
        return exps
    } catch(error) {
        console.error('Could not get educations!', error);
        throw error;
    }
}

const getEducation = async(resumeId, educationId) => {
    try {
        const exp = await educationModel.findByPk(educationId, {
            where: {
                resumeId: resumeId
            }
        });
        return exp;
    } catch(error) {
        console.error('Could not get education by id!', error);
        throw error;
    }
}

const createEducation = async(resumeId, educationBody) => {
    try {
        const newExp = await educationModel.create({ ...educationBody, resumeId: resumeId } );
        return newExp;
    } catch(error) {
        console.error('Could not create education!', error);
        throw error;
    }
}

const updateEducation = async(resumeId, educationId, educationBodyUpdated) => {
    try {
        const educationToUpdate = await educationModel.findByPk(educationId, {
            where: {
                resumeId: resumeId
            }
        });

        if(educationToUpdate) {
            educationToUpdate.set({
                institution: educationBodyUpdated.institution,
                degree: educationBodyUpdated.degree,
                startDate: educationBodyUpdated.startDate,
                endDate: educationBodyUpdated.endDate,
                description: educationBodyUpdated.description
            });
            await educationToUpdate.save();
        }
        return educationToUpdate;
    } catch(error) {
        console.error('Could not update education!', error);
        throw error;
    }
}

const deleteEducation = async(resumeId, educationId) => {
    try {
        const educationToDelete = await educationModel.findByPk(educationId, {
            where: {
                resumeId: resumeId
            }
        });

        if(educationToDelete) {
            educationToDelete.destroy({
                where: {
                    id: educationId
                }
            })
        };
        return educationToDelete;
    } catch(error) {
        console.error('Could not delete education!', error);
        throw error;
    }
}

module.exports = { getAllEducations, getEducation, createEducation, updateEducation, deleteEducation };
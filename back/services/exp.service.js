const expModel = require('../models').Experience;

const getAllExp = async(resumeId) => {
    try {
        const exps = await expModel.findAll(
            {
                where: {
                    resumeId: resumeId
                }
            }
        );
        return exps
    } catch(error) {
        console.error('Could not get experiences!', error);
        throw error;
    }
}

const getExp = async(resumeId, expId) => {
    try {
        const exp = await expModel.findByPk(expId, {
            where: {
                resumeId: resumeId
            }
        });
        return exp;
    } catch(error) {
        console.error('Could not get experience by id!', error);
        throw error;
    }
}

const createExp = async(resumeId, expBody) => {
    try {
        const newExp = await expModel.create({ ...expBody, resumeId: resumeId } );
        return newExp;
    } catch(error) {
        console.error('Could not create experience!', error);
        throw error;
    }
}

const updateExp = async(resumeId, expId, expBodyUpdated) => {
    try {
        const expToUpdate = await expModel.findByPk(expId, {
            where: {
                resumeId: resumeId
            }
        });

        if(expToUpdate) {
            expToUpdate.set({
                jobTitle: expBodyUpdated.jobTitle,
                company: expBodyUpdated.company,
                startDate: expBodyUpdated.startDate,
                endDate: expBodyUpdated.endDate,
                description: expBodyUpdated.description
            });
            await expToUpdate.save();
        }
        return expToUpdate;
    } catch(error) {
        console.error('Could not update experience!', error);
        throw error;
    }
}

const deleteExp = async(resumeId, expId) => {
    try {
        const expToDelete = await expModel.findByPk(expId, {
            where: {
                resumeId: resumeId
            }
        });

        if(expToDelete) {
            expToDelete.destroy({
                where: {
                    id: expId
                }
            })
        };
        return expToDelete;
    } catch(error) {
        console.error('Could not delete work experience!', error);
        throw error;
    }
}

module.exports = { getAllExp, getExp, createExp, updateExp, deleteExp };
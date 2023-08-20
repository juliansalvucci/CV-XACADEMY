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

module.exports = { getAllExp, getExp, createExp };
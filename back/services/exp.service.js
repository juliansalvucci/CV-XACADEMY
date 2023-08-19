const expModel = require('../models');

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

}

module.exports = { getAllExp, getExp }
const skillModel = require('../models').Skill;

const getAllSkills = async(resumeId) => {
    try {
        const exps = await skillModel.findAll(
            {
                where: {
                    resumeId: resumeId
                }
            }
        );
        return exps
    } catch(error) {
        console.error('Could not get skills!', error);
        throw error;
    }
}

const getSkill = async(resumeId, skillId) => {
    try {
        const exp = await skillModel.findByPk(skillId, {
            where: {
                resumeId: resumeId
            }
        });
        return exp;
    } catch(error) {
        console.error('Could not get skill by id!', error);
        throw error;
    }
}

const createSkill = async(resumeId, skillBody) => {
    try {
        const newExp = await skillModel.create({ ...skillBody, resumeId: resumeId } );
        return newExp;
    } catch(error) {
        console.error('Could not create skill!', error);
        throw error;
    }
}

const updateSkill = async(resumeId, skillId, skillBodyUpdated) => {
    try {
        const skillToUpdate = await skillModel.findByPk(skillId, {
            where: {
                resumeId: resumeId
            }
        });

        if(skillToUpdate) {
            skillToUpdate.set({
                skillName: skillBodyUpdated.skillName,
                startDate: skillBodyUpdated.startDate,
                endDate: skillBodyUpdated.endDate
            });
            await skillToUpdate.save();
        }
        return skillToUpdate;
    } catch(error) {
        console.error('Could not update skill!', error);
        throw error;
    }
}

const deleteSkill = async(resumeId, skillId) => {
    try {
        const skillToDelete = await skillModel.findByPk(skillId, {
            where: {
                resumeId: resumeId
            }
        });

        if(skillToDelete) {
            skillToDelete.destroy({
                where: {
                    id: skillId
                }
            })
        };
        return skillToDelete;
    } catch(error) {
        console.error('Could not delete work experience!', error);
        throw error;
    }
}

module.exports = { getAllSkills, getSkill, createSkill, updateSkill, deleteSkill };
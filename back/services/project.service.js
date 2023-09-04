const projectModel = require('../models').Project;

const getAllProjects = async(resumeId) => {
    try {
        const exps = await projectModel.findAll(
            {
                where: {
                    resumeId: resumeId
                }
            }
        );
        return exps
    } catch(error) {
        console.error('Could not get projects!', error);
        throw error;
    }
}

const getProject = async(resumeId, projectId) => {
    try {
        const exp = await projectModel.findByPk(projectId, {
            where: {
                resumeId: resumeId
            }
        });
        return exp;
    } catch(error) {
        console.error('Could not get project by id!', error);
        throw error;
    }
}

const createProject = async(resumeId, projectBody) => {
    try {
        const newExp = await projectModel.create({ ...projectBody, resumeId: resumeId } );
        return newExp;
    } catch(error) {
        console.error('Could not create project!', error);
        throw error;
    }
}

const updateProject = async(resumeId, projectId, projectBodyUpdated) => {
    try {
        const projectToUpdate = await projectModel.findByPk(projectId, {
            where: {
                resumeId: resumeId
            }
        });

        if(projectToUpdate) {
            projectToUpdate.set({
                projectName: projectBodyUpdated.projectName,
                startDate: projectBodyUpdated.startDate,
                endDate: projectBodyUpdated.endDate,
                description: projectBodyUpdated.description
            });
            await projectToUpdate.save();
        }
        return projectToUpdate;
    } catch(error) {
        console.error('Could not update project!', error);
        throw error;
    }
}

const deleteProject = async(resumeId, projectId) => {
    try {
        const projectToDelete = await projectModel.findByPk(projectId, {
            where: {
                resumeId: resumeId
            }
        });

        if(projectToDelete) {
            projectToDelete.destroy({
                where: {
                    id: projectId
                }
            })
        };
        return projectToDelete;
    } catch(error) {
        console.error('Could not delete work experience!', error);
        throw error;
    }
}

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };
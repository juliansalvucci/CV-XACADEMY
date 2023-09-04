const { projectService, resumeService } = require('../services');

const getAllProjects = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getAllProject', error: `Can not get an project on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const exps = await projectService.getAllProjects(req.params.resumeId);
            if(!exps) { 
                res.status(404).json({ action: 'getAllProject', error: 'Could not get all projects!'});
            } else {
                res.json(exps);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllProject', error: error.message });
    }  
}

const getProject = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'getProject', error: `Can not get project on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const project = await projectService.getProject(req.params.resumeId, req.params.projectId);
            if(!project) {
                res.status(404).json({ action: 'getProject', error: `Project with id: ${req.params.projectId} does not exist`});
            } else {
                res.json(project);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'getAllExp', error: error.message });
    }  
}

const createProject = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId); // Primero nos aseguramos de que haya un id de cv valido.

        if(!resume) { // Si no existe ese cv, mostrar error.
            res.status(404).json({ action: 'createProject', error: `Can not create project on a resume with id: ${req.params.resumeId}, because the resume does not exist!` });
        } else { 
            const newProject = await projectService.createProject(req.params.resumeId, req.body);
            res.json(newProject);
        }
    } catch(error) {
        res.status(500).json({ action: 'createProject', error: error.message });
    }
}

const updateProject = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'updateProject', error: `Can not update project on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else {
            const project = await projectService.getProject(req.params.resumeId, req.params.projectId); 
            if(!project) {
                res.status(404).json({ action: 'updateProject', error: `Project with id: ${req.params.projectId} does not exist`})
            } else {
                const projectToUpdate = await projectService.updateProject(req.params.resumeId, req.params.projectId, req.body);
                res.json(projectToUpdate);
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'updateProject', error: error.message });
    }
}

const deleteProject = async(req, res) => {
    try {
        const resume = await resumeService.getResume(req.params.resumeId);

        if(!resume) {
            res.status(404).json({ action: 'deleteProject', error: `Can not delete project on a resume with id: ${req.params.resumeId}, because the resume does not exist!` })
        } else { 
            const expToDelete = await projectService.deleteProject(req.params.resumeId, req.params.projectId);
            if(expToDelete) {
                res.json({ message: `Project with id ${req.params.projectId} was successfuly deleted!` });
            }
        }
    } catch(error) {
        res.status(500).json({ action: 'deleteProject', error: error.message });
    }
}

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };
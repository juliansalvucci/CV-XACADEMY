const resumeModel = require("../models").Resume;
const userModel = require("../models").User;
const { Experience, Education, Project, Skill } = require("../models");

const getAllResumes = async () => {
  try {
    const resumes = await resumeModel.findAll({
      include: [
        { model: Experience },
        { model: Education },
        { model: Project },
        { model: Skill },
      ],
    });
    return resumes;
  } catch (error) {
    console.error("Could not get resumes!", error);
    throw error;
  }
};

const getResume = async (resumeId) => {
  try {
    const resume = await resumeModel.findByPk(resumeId, {
      include: [
        { model: Experience },
        { model: Education },
        { model: Project },
        { model: Skill },
      ],
    });
    return resume;
  } catch (error) {
    console.error("Could not find resume!", error);
    throw error;
  }
};

const createResume = async (resume, userName) => {
  try {
    const userFound = await userModel.findAll({
      where: {
        user: userName.user,
      },
    });
    if (userFound.length !== 0) {
      const newResume = await resumeModel.create({
        ...resume,
        userId: userFound[0].id,
      });
      return newResume;
    } else {
      throw new error("Could not find user!");
    }
  } catch (error) {
    console.error("Could not create a new resume", error);
    throw error;
  }
};

const updateResume = async (resumeBodyUpdated, resumeId) => {
  try {
    const resumeToUpdate = await resumeModel.findByPk(resumeId);
    if (resumeToUpdate) {
      resumeToUpdate.set({
        firstName: resumeBodyUpdated.firstName,
        lastName: resumeBodyUpdated.lastName,
        contactEmail: resumeBodyUpdated.contactEmail,
        contactPhone: resumeBodyUpdated.contactPhone,
      });
      await resumeToUpdate.save();
    }
    return resumeToUpdate;
  } catch (error) {
    console.error("Could not find resume!", error);
    throw error;
  }
};

const deleteResume = async (resumeId) => {
  try {
    const resumeToDelete = await resumeModel.findByPk(resumeId);
    if (resumeToDelete) {
      resumeToDelete.destroy({
        where: {
          id: resumeId,
        },
      });
    }
  } catch (error) {
    console.error("Could not delete resume!", error);
    throw error;
  }
};

const getAllResumesByUser = async (userId) => {
  try {
    const resumes = await resumeModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        { model: Experience },
        { model: Education },
        { model: Project },
        { model: Skill },
      ],
    });
    return resumes;
  } catch (error) {
    console.error("Could not get resumes!", error);
    throw error;
  }
};

const getMaxResumeIdByUserId = async (userId) => {
  try {
    const maxResumeId = await resumeModel.max("id", {
      where: {
        userId: userId,
      },
    });
    return maxResumeId;
  } catch (error) {
    console.error("Error al obtener el resumeId máximo por userId:", error);
    throw error;
  }
};

module.exports = {
  getAllResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  getAllResumesByUser,
  getMaxResumeIdByUserId,
};

const Project = require('../models/Project');

const createProject = async (data, userId) => {
  const project = await Project.create({
    ...data,
    owner: userId
  });

  return project;
};

const getUserProjects = async (userId) => {
  return await Project.find({ owner: userId });
};

const deleteProject = async (projectId, userId) => {
  return await Project.findOneAndDelete({
    _id: projectId,
    owner: userId
  });
};

module.exports = {
  createProject,
  getUserProjects,
  deleteProject
};
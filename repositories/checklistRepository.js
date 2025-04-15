const { Checklist } = require("../models/checklistModel");

const getAllChecklists = async (userId) => {
  return Checklist.findAll({ where: { userId } });
};

const createChecklist = async (checklistData) => {
  return Checklist.create(checklistData);
};

const getChecklistById = async (id, userId) => {
  return Checklist.findOne({ where: { id, userId } });
};

const deleteChecklist = async (id, userId) => {
  return Checklist.destroy({ where: { id, userId } });
};

module.exports = {
  getAllChecklists,
  createChecklist,
  getChecklistById,
  deleteChecklist,
};
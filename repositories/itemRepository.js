const Item = require("../models/itemModel");

const getAllItemsInChecklist = async (checklistId) => {
  return Item.findAll({ where: { checklistId } });
};

const createItemInChecklist = async (itemData) => {
  return Item.create(itemData);
};

const getItemById = async (id, checklistId) => {
  return Item.findOne({ where: { id, checklistId } });
};

const updateItem = async (id, checklistId, itemData) => {
  return Item.update(itemData, { where: { id, checklistId } });
};

const deleteItem = async (id, checklistId) => {
  return Item.destroy({ where: { id, checklistId } });
};

module.exports = {
  getAllItemsInChecklist,
  createItemInChecklist,
  getItemById,
  updateItem,
  deleteItem,
};
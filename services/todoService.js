// services/todoService.js
const checklistRepository = require("../repositories/checklistRepository");
const itemRepository = require("../repositories/itemRepository");

const getAllChecklists = async (userId) => {
  return checklistRepository.getAllChecklists(userId);
};

const createChecklist = async (userId, name) => {
  return checklistRepository.createChecklist({ userId, name });
};

const deleteChecklist = async (checklistId, userId) => {
  const checklist = await checklistRepository.getChecklistById(checklistId, userId);
  if (!checklist) {
    throw new Error("Checklist not found");
  }
  return checklistRepository.deleteChecklist(checklistId, userId);
};

const getAllItemsInChecklist = async (checklistId) => {
  return itemRepository.getAllItemsInChecklist(checklistId);
};

const createItemInChecklist = async (checklistId, itemName) => {
  return itemRepository.createItemInChecklist({ checklistId, itemName, completed: false });
};

const getItemInChecklist = async (itemId, checklistId) => {
  return itemRepository.getItemById(itemId, checklistId);
};

const updateItemStatus = async (itemId, checklistId) => {
  const item = await itemRepository.getItemById(itemId, checklistId);
  if (!item) {
    throw new Error("Item not found");
  }
  return itemRepository.updateItem(itemId, checklistId, { completed: !item.completed });
};

const deleteItem = async (itemId, checklistId) => {
  const item = await itemRepository.getItemById(itemId, checklistId);
  if (!item) {
    throw new Error("Item not found");
  }
  return itemRepository.deleteItem(itemId, checklistId);
};

const renameItem = async (itemId, checklistId, itemName) => {
    const item = await itemRepository.getItemById(itemId, checklistId);
    if(!item){
        throw new Error("Item not found");
    }
    return itemRepository.updateItem(itemId, checklistId, {itemName});
};

module.exports = {
  getAllChecklists,
  createChecklist,
  deleteChecklist,
  getAllItemsInChecklist,
  createItemInChecklist,
  getItemInChecklist,
  updateItemStatus,
  deleteItem,
  renameItem
};
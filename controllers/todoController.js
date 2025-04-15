const todoService = require("../services/todoService");
const { validationResult } = require("express-validator");

const getAllChecklists = async (req, res) => {
  try {
    const checklists = await todoService.getAllChecklists(req.userId);
    res.json(checklists);
  } catch (error) {
    console.error("Error in getAllChecklists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createChecklist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const checklist = await todoService.createChecklist(req.userId, req.body.name);
    res.status(201).json(checklist);
  } catch (error) {
    console.error("Error in createChecklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteChecklist = async (req, res) => {
  try {
    await todoService.deleteChecklist(req.params.checklistId, req.userId);
    res.json({ message: "Checklist deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChecklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllItemsInChecklist = async (req, res) => {
  try {
    const items = await todoService.getAllItemsInChecklist(req.params.checklistId);
    res.json(items);
  } catch (error) {
    console.error("Error in getAllItemsInChecklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createItemInChecklist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const item = await todoService.createItemInChecklist(req.params.checklistId, req.body.itemName);
    res.status(201).json(item);
  } catch (error) {
    console.error("Error in createItemInChecklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItemInChecklist = async (req, res) => {
  try {
    const item = await todoService.getItemInChecklist(req.params.itemId, req.params.checklistId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error in getItemInChecklist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateItemStatus = async (req, res) => {
  try {
    await todoService.updateItemStatus(req.params.itemId, req.params.checklistId);
    res.json({ message: "Item status updated successfully" });
  } catch (error) {
    console.error("Error in updateItemStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    await todoService.deleteItem(req.params.itemId, req.params.checklistId);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error in deleteItem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const renameItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await todoService.renameItem(req.params.itemId, req.params.checklistId, req.body.itemName);
    res.json({ message: "Item renamed successfully" });
  } catch (error) {
    console.error("Error in renameItem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  renameItem,
};
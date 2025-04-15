const express = require("express");
const authController = require("../controllers/authController");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Routes (Require Authentication)
router.use(authMiddleware);

// Checklist Routes
router.get("/checklists", todoController.getAllChecklists);
router.post("/checklists", todoController.createChecklist);
router.delete("/checklists/:checklistId", todoController.deleteChecklist);

// Item Routes
router.get("/checklists/:checklistId/items", todoController.getAllItemsInChecklist);
router.post("/checklists/:checklistId/items", todoController.createItemInChecklist);
router.get("/checklists/:checklistId/items/:itemId", todoController.getItemInChecklist);
router.put("/checklists/:checklistId/items/:itemId", todoController.updateItemStatus);
router.delete("/checklists/:checklistId/items/:itemId", todoController.deleteItem);
router.put("/checklists/:checklistId/items/rename/:itemId", todoController.renameItem);

// Middleware to log all routes (Optional)
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

module.exports = router;
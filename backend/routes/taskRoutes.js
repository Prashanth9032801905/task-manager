const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");

router.use(protect);

router.get("/stats", getTaskStats);
router.route("/").get(getTasks).post(validateTask, createTask);
router.route("/:id").get(getTask).put(validateTask, updateTask).delete(deleteTask);

module.exports = router;

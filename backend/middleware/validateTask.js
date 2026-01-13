const validateTask = (req, res, next) => {
  const { title, status, priority, dueDate } = req.body;

  // Validate title
  if (title !== undefined && (!title || title.trim().length === 0)) {
    return res.status(400).json({
      success: false,
      message: "Task title cannot be empty",
    });
  }

  // Validate status
  const validStatuses = ["pending", "in-progress", "completed"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(", ")}`,
    });
  }

  // Validate priority
  const validPriorities = ["low", "medium", "high"];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validPriorities.join(", ")}`,
    });
  }

  // Validate due date
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid due date format",
      });
    }
  }

  next();
};

module.exports = validateTask;

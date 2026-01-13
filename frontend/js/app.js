const API_URL = "/api";

// Utility Functions
export const getToken = () => localStorage.getItem("token");
const setToken = (token) => localStorage.setItem("token", token);
const removeToken = () => localStorage.removeItem("token");
export const getUser = () => JSON.parse(localStorage.getItem("user") || "null");
const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
const removeUser = () => localStorage.removeItem("user");

export const showAlert = (message, type = "error") => {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;

  const container = document.querySelector(".auth-card") || document.querySelector(".tasks-container");
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => alertDiv.remove(), 5000);
  }
};

const apiRequest = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, create error from status text
      throw new Error(response.statusText || "An error occurred");
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || "An error occurred");
    }

    return data;
  } catch (error) {
    // Re-throw with a more descriptive message if needed
    if (error.message) {
      throw error;
    }
    throw new Error("Network error or server unavailable");
  }
};

// Auth Functions
export const register = async (name, email, password) => {
  try {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    // Registration successful: show message and send user to login page
    showAlert(data.message || "Account created successfully. Please log in.", "success");
    // Small delay so user can see the message
    setTimeout(() => {
      window.location.href = "login.html";
    }, 800);
  } catch (error) {
    showAlert(error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setToken(data.token);
    setUser(data.user);
    window.location.href = "dashboard.html";
  } catch (error) {
    showAlert(error.message);
    throw error;
  }
};

export const logout = () => {
  removeToken();
  removeUser();
  window.location.href = "login.html";
};

// Task Functions
export const getTasks = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.priority) queryParams.append("priority", filters.priority);
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
    if (filters.page) queryParams.append("page", filters.page);
    if (filters.limit) queryParams.append("limit", filters.limit);

    const query = queryParams.toString();
    const url = `/tasks${query ? `?${query}` : ""}`;
    const data = await apiRequest(url);
    return data;
  } catch (error) {
    showAlert(error.message);
    return { data: [], total: 0, page: 1, pages: 0 };
  }
};

export const getTaskStats = async () => {
  try {
    const data = await apiRequest("/tasks/stats");
    return data.data;
  } catch (error) {
    showAlert(error.message);
    return null;
  }
};

export const createTask = async (taskData) => {
  try {
    const data = await apiRequest("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
    return data.data;
  } catch (error) {
    showAlert(error.message);
    throw error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const data = await apiRequest(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
    return data.data;
  } catch (error) {
    showAlert(error.message);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    await apiRequest(`/tasks/${id}`, {
      method: "DELETE",
    });
    return true;
  } catch (error) {
    showAlert(error.message);
    throw error;
  }
};

// Check Authentication
export const checkAuth = () => {
  const token = getToken();
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
};

// Format Date
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Task Status and Priority Helpers
export const getStatusBadge = (status) => {
  const badges = {
    pending: "badge-pending",
    "in-progress": "badge-in-progress",
    completed: "badge-completed",
  };
  return badges[status] || "badge-pending";
};

export const getPriorityBadge = (priority) => {
  const badges = {
    low: "badge-low",
    medium: "badge-medium",
    high: "badge-high",
  };
  return badges[priority] || "badge-medium";
};

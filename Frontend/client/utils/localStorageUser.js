// Save user ID to localStorage
export const saveUserId = (userId) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userId", userId);
  }
};

// Get user ID from localStorage
export const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
};

// Remove user ID (for logout)
export const removeUserId = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userId");
  }
};

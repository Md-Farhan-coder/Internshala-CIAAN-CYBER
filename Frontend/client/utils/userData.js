// localStorageHelper.js

const USER_DATA_KEY = "userData";

// Save user info to localStorage
export const saveUserData = ({ firstName, lastName, email, jobTitle }) => {
  const data = { firstName, lastName, email, jobTitle };
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};

// Retrieve user info from localStorage
export const getUserData = () => {
  const data = localStorage.getItem(USER_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

// Clear user info from localStorage
export const clearUserData = () => {
  localStorage.removeItem(USER_DATA_KEY);
};

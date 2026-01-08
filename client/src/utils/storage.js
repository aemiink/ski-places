/* ---------- Token ---------- */
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

/* ---------- User ---------- */
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

/* ---------- Avatar ---------- */
export const setUserAvatar = (avatar) => {
  localStorage.setItem("avatar", avatar);
};

export const getUserAvatar = () => {
  return localStorage.getItem("avatar");
};

export const removeUserAvatar = () => {
  localStorage.removeItem("avatar");
};

/* ---------- Clear All ---------- */
export const clearAuthStorage = () => {
  removeToken();
  removeUser();
  removeUserAvatar();
};

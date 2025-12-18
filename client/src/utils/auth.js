export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

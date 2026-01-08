import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import {
  setUserAvatar,
  getUserAvatar
} from "../utils/storage";
import { getAvatarByUsername } from "../utils/randomAvatar";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (storedUser && token) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    let avatar = getUserAvatar();
    if (!avatar) {
      avatar = getAvatarByUsername(parsedUser.username);
      setUserAvatar(avatar);
    }
  }

  setLoading(false);
}, []);



 const login = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password
  });

  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  const avatar = getAvatarByUsername(user.username);
  setUserAvatar(avatar);

  setUser(user);
};


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");

    setUser(null);
  };


 const changeAvatar = () => {
  const randomSeed = `${user.username}-${Date.now()}`;
  const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
  setUserAvatar(avatar);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading,
        login,
        logout,
        changeAvatar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

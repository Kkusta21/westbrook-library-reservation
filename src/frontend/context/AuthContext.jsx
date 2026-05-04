import React, { createContext, useEffect, useState } from "react";
import { login as loginService } from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("wl_token");
    const storedUser = localStorage.getItem("wl_user");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("wl_user");
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await loginService(email, password);
    const token = response.token || response.data?.token;
    const user = response.user || response.data?.user;

    localStorage.setItem("wl_token", token);
    localStorage.setItem("wl_user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("wl_token");
    localStorage.removeItem("wl_user");
    setToken(null);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
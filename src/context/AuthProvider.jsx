import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import api from "../api/axios";
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", credentials);
      const token = response.data.token;
      if (!token) {
        throw new Error("No token received");
      }
      localStorage.setItem("token", token);
      const decode = jwtDecode(token);
      setUser({ ...decode, token });
      setLoading(false);
      // console.log("decoded data", decode);
      return { ok: true, role: decode.role };
    } catch (error) {
      setLoading(false);
      console.error("Login error", error);
      return {
        ok: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/register", data);
      setLoading(false);
      return { ok: true, data: "Registration successful" };
    } catch (error) {
      setLoading(false);
      return {
        ok: false,
        error: error.response?.data?.message || error.message,
      };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, token });
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

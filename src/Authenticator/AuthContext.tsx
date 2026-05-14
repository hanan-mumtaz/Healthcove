import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import axios from "axios";
import API from "../services/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
interface User {
  id: string;
  name?: string;        // Optional because Google might use displayName
  displayName?: string; // Google OAuth field
  email: string;
  role: string;
  picture?: string;     // Google profile image
  photo?: string;       // Alternative field name for photo
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  login: (userData: User, token: string) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ✅ FIX 1: Initialize state synchronously from localStorage 
  // This prevents the 'Sign In' flicker on reload because 'user' is populated before render.
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      try {
        // Immediately sync the API instance header
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(true);

  // Helper to sync with backend
  const fetchUser = async (token: string) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Manual header override ensures this specific call is authorized 
      // even if defaults haven't finished setting.
      const res = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        // Support both { user: {} } and direct {} response structures
        const userData = res.data.user || res.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err: any) {
      console.error("Session verification failed:", err.response?.data || err.message);
      
      // 🚨 CRITICAL: Only logout if the backend explicitly says the token is dead (401).
      // This prevents logging out if the server is temporarily down (500) or network is slow.
      if (err.response?.status === 401) {
        handleLogoutLogic(); 
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: any, token: string) => {
    console.log("DEBUG: Google User Data Received ->", userData);
    // 1. Persist to storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    
    // 2. Update API defaults immediately for the next requests
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // 3. Update state
    setUser(userData);
    setLoading(false);
    
    // 4. Verification Sync in background
    await fetchUser(token); 
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        // Ensure defaults are set on every refresh
        API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        await fetchUser(storedToken);
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  // Centralized cleanup logic
  const handleLogoutLogic = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(`${API_URL}/api/auth/logout`, {}, { 
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    handleLogoutLogic();
    // Redirect to home and refresh to clear any leftover state in memory
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
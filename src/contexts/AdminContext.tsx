import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<void>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useLocalStorage<boolean>("isAdmin", false);

  const login = async (password: string) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAdmin(true);
      } else {
        throw new Error("Incorrect password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

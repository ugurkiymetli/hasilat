import { Login } from "@/types/auth";
import React, { createContext, useContext, useState, useEffect } from "react";

type AdminContextValue = {
  isAdmin: boolean | null;
  isLoading: boolean;
  login: (input: Login) => Promise<void>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue>({
  isAdmin: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(storedAdminStatus === "true");
    setIsLoading(false);
  }, []);

  const login = async ({ username, password }: Login) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
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
    localStorage.removeItem("isAdmin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

import React, { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ILoginDetails } from "../../types/types";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  // Initialize isAuthenticated from localStorage
  const isUserAuthenticated = document.cookie.includes("isAuthenticated=true");

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(isUserAuthenticated);

  const login = (loginDetails: ILoginDetails) => {
    const { email, password } = loginDetails;

    if (email && password) {
      document.cookie = `isAuthenticated=true; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Try again", { duration: 2000 });
    }
  };

  const logout = () => {
    document.cookie = "isAuthenticated=; path=/; max-age=0";
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

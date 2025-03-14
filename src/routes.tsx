import React, { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useAuth } from "./context/Auth/useAuth";
import Layout from "./layout/Layout";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/UserDetail/UserDetail";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

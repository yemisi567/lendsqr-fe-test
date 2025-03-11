// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.scss";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { UsersProvider } from "./context/Users/UsersProvider";
import { Toaster } from "sonner";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <UsersProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

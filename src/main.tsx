// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./styles/globals.scss";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { UsersProvider } from "./context/Users/UsersProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <AuthProvider>
        <UsersProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </UsersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

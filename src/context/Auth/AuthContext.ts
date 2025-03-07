import { createContext } from "react";
import { ILoginDetails } from "../../types/types";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (loginDetails: ILoginDetails) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

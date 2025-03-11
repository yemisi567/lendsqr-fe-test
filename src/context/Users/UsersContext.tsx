import { createContext } from "react";
import { IUser } from "../../types/types";

interface UsersState {
  users: IUser[] | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
}

// Create Users Context
export const UsersContext = createContext<UsersState | undefined>(undefined);

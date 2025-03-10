import { createContext } from "react";
import { IUserDetails } from "../../types/types";

interface UsersState {
  users: IUserDetails[] | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
}

// Create Users Context
export const UsersContext = createContext<UsersState | undefined>(undefined);

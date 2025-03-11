/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useEffect } from "react";
import axios from "axios";
import { UsersContext } from "./UsersContext";
import { IUserDetails, UsersState } from "../../types/types";

// Initial state
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Reducer function
const usersReducer = (state: UsersState, action: any): UsersState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        error: null,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const MOCK_URL = import.meta.env.VITE_MOCKY_URL;
  const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
  const MOCKY_ID = import.meta.env.VITE_MOCKY_ID;
  const MOCKY_URL = `${MOCK_URL}/v3/${MOCKY_ID}`;

  const fetchUsers = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const { data } = await axios.get<{ users: IUserDetails[] }>(MOCKY_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });

      dispatch({ type: "FETCH_SUCCESS", payload: data });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Failed to fetch users. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContext.Provider value={{ ...state, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

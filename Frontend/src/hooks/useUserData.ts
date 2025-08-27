import type { UserDataContextType } from "@/types";
import { createContext, useContext } from "react";
export const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

// Custom hook
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

import { UserDataContext } from "@/hooks/useUserData";
import type { Task, Team, User } from "@/types";
import { useState, type ReactNode } from "react";

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <UserDataContext.Provider
      value={{
        activeUser,
        setActiveUser,
        tasks,
        setTasks,
        teams,
        setTeams,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

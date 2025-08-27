import type { Dispatch, SetStateAction } from "react";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export type Task = {
  id?: string;
  title?: string;
  status?: string;
  description?: string;
  createdAt?: string;
  assignedTo: [];
};

export type Team = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt: Date;
};

// Context value type
export type UserDataContextType = {
  activeUser: User | null;
  setActiveUser: Dispatch<SetStateAction<User | null>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

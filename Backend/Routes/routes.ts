import { Router } from "express";
import {
  createAdmin,
  createTeam,
  deleteLeader,
  deleteTeam,
  loginUser,
  logOutUser,
  registerUser,
} from "../Controller/userAuth";
import {
  createTask,
  deleteTask,
  editTask,
  getTasks,
  getTasksByAdmin,
} from "../Controller/Task";
import { authenticate } from "../Middleware/authMiddleware";
import { acceptRequest } from "../Controller/requests";
import {
  getAdminData,
  getAllTasksAssigned,
  getAllUsers,
  getLeaderData,
  getLeadersDataByAdmin,
  getRequestToLeader,
  getTeamData,
  getTeamDataByLeader,
} from "../Controller/getData";

const route = Router();
// Auth
route.post("/login", loginUser);
route.post("/register", registerUser);

// CRUD
route.patch("/team/:userId/tasks", authenticate, editTask);
route.post("/leader/:userId", authenticate, createTask);
route.patch("/leader/:userId/tasks", authenticate, editTask);
route.delete("/leader/:userId/tasks", authenticate, deleteTask);
//
route.get("/admin/:userId", authenticate, getAdminData);
route.get("/admin/:userId/tasks", authenticate, getTasksByAdmin);
route.delete("/admin/:userId/teams", authenticate, deleteLeader);
route.post("/admin/:userId/createAdmin", authenticate, createAdmin);

route.get("/admin/:userId/requested", authenticate, getRequestToLeader);
route.patch("/admin/:userId/requested", acceptRequest);
route.get("/admin/:userId/leaders", getLeadersDataByAdmin);
route.get("/admin/:userId/users", authenticate, getAllUsers);
route.get("/admin/:userId/home", authenticate, getAllUsers);

// Leaders

route.get("/leader/:userId", authenticate, getLeaderData);
route.get("/leader/:userId/teams", authenticate, getTeamDataByLeader);
route.get("/leader/:userId/home", authenticate, getTeamDataByLeader);
route.get("/leader/:userId/tasks", authenticate, getTasks);
route.post("/leader/:userId/home", authenticate, getTasks);
// route.get("/leader/:userId/teams", authenticate, getTasks);

route.post("/leader/:userId/teams", authenticate, createTeam);
route.delete("/leader/:userId/teams", authenticate, deleteTeam);

// Team

route.get("/team/:userId/tasks", getAllTasksAssigned);
route.get("/team/:userId", authenticate, getTeamData);

//
route.get("/logout", logOutUser);
export default route;

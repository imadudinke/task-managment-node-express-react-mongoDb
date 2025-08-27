"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = require("../Controller/userAuth");
const Task_1 = require("../Controller/Task");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const requests_1 = require("../Controller/requests");
const getData_1 = require("../Controller/getData");
const route = (0, express_1.Router)();
// Auth
route.post("/login", userAuth_1.loginUser);
route.post("/register", userAuth_1.registerUser);
// CRUD
route.patch("/team/:userId/tasks", authMiddleware_1.authenticate, Task_1.editTask);
route.post("/leader/:userId", authMiddleware_1.authenticate, Task_1.createTask);
route.patch("/leader/:userId/tasks", authMiddleware_1.authenticate, Task_1.editTask);
route.delete("/leader/:userId/tasks", authMiddleware_1.authenticate, Task_1.deleteTask);
//
route.get("/admin/:userId", authMiddleware_1.authenticate, getData_1.getAdminData);
route.get("/admin/:userId/tasks", authMiddleware_1.authenticate, Task_1.getTasksByAdmin);
route.delete("/admin/:userId/teams", authMiddleware_1.authenticate, userAuth_1.deleteLeader);
route.post("/admin/:userId/createAdmin", authMiddleware_1.authenticate, userAuth_1.createAdmin);
route.get("/admin/:userId/requested", authMiddleware_1.authenticate, getData_1.getRequestToLeader);
route.patch("/admin/:userId/requested", requests_1.acceptRequest);
route.get("/admin/:userId/leaders", getData_1.getLeadersDataByAdmin);
route.get("/admin/:userId/users", authMiddleware_1.authenticate, getData_1.getAllUsers);
route.get("/admin/:userId/home", authMiddleware_1.authenticate, getData_1.getAllUsers);
// Leaders
route.get("/leader/:userId", authMiddleware_1.authenticate, getData_1.getLeaderData);
route.get("/leader/:userId/teams", authMiddleware_1.authenticate, getData_1.getTeamDataByLeader);
route.get("/leader/:userId/home", authMiddleware_1.authenticate, getData_1.getTeamDataByLeader);
route.get("/leader/:userId/tasks", authMiddleware_1.authenticate, Task_1.getTasks);
route.post("/leader/:userId/home", authMiddleware_1.authenticate, Task_1.getTasks);
// route.get("/leader/:userId/teams", authenticate, getTasks);
route.post("/leader/:userId/teams", authMiddleware_1.authenticate, userAuth_1.createTeam);
route.delete("/leader/:userId/teams", authMiddleware_1.authenticate, userAuth_1.deleteTeam);
// Team
route.get("/team/:userId/tasks", getData_1.getAllTasksAssigned);
route.get("/team/:userId", authMiddleware_1.authenticate, getData_1.getTeamData);
//
route.get("/logout", userAuth_1.logOutUser);
exports.default = route;
//# sourceMappingURL=routes.js.map
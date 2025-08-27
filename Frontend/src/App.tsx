import LeaderList from "./page/admin/LeaderList";
import Requested from "./page/admin/Requested";
import LoginPage from "./page/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegistrationPage from "./page/RegistrationPage";
import { Toaster } from "sonner";
import AllUsers from "./page/admin/Users/AllUsers";
import DashboardLeader from "./page/leader/Dashboard";
import DashboardAdmin from "./page/admin/Dashboard";
import HomeAdmin from "./page/admin/Home";
import LeaderHome from "./page/leader/LeaderHome";
import TasksList from "./page/leader/TasksList";
import { TeamList } from "./page/leader/TeamList";
import Loader from "./components/Spinner";
import { useUserData } from "@/hooks/useUserData";
import TeamDashboard from "./page/team/TeamDashboard";
import TasksListForTeam from "./page/team/TasksList";
import { TasksListForAdmin } from "./page/admin/TasksList";
import CreateAdmin from "./page/admin/CreateAdmin";
import TeamHome from "./page/team/TeamHome";
import RequestedToJoin from "./page/Requested";
import Rejected from "./page/Rejected";
const App = () => {
  const { isLoading } = useUserData();
  return (
    <div>
      {isLoading && <Loader />}
      <Toaster position="bottom-right" richColors closeButton />
      <Router>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/requested" element={<RequestedToJoin />} />
          <Route path="/rejected" element={<Rejected />} />

          <Route path="/admin/:userId" element={<DashboardAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="home" element={<HomeAdmin />} />
            <Route path="requested" element={<Requested />} />
            <Route path="leaders" element={<LeaderList />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="tasks" element={<TasksListForAdmin />} />
            <Route path="createAdmin" element={<CreateAdmin />} />
          </Route>

          <Route path="/leader/:userId" element={<DashboardLeader />}>
            <Route index element={<LeaderHome />} />
            <Route path="home" element={<LeaderHome />} />
            <Route path="tasks" element={<TasksList />} />
            <Route path="teams" element={<TeamList />} />
          </Route>

          <Route path="/team/:userId" element={<TeamDashboard />}>
            <Route index element={<TeamHome />} />
            <Route path="home" element={<TeamHome />} />
            <Route path="tasks" element={<TasksListForTeam />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

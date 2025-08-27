import { useEffect, useState } from "react";
import { ChartStat } from "../../components/Chart";
import { useParams } from "react-router";
import { Crown, Group, Users } from "lucide-react";
import type { User } from "@/types";
import { useUserData } from "@/hooks/useUserData";

const HomeAdmin = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState<User[]>();
  const { setIsLoading } = useUserData();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}/home`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.status === 401) {
          window.location.href = "/";
        }
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [userId, setIsLoading]);

  const totalTeam = users?.filter((user) => user.role === "team");
  const totalLeaders = users?.filter((user) => user.role === "leader");

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Leaders */}
        <div className="rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all p-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Leaders
            </span>
          </div>
          <p className="text-3xl font-bold mt-3">{totalLeaders?.length || 0}</p>
        </div>

        {/* Teams */}
        <div className="rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all p-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Group className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Teams
            </span>
          </div>
          <p className="text-3xl font-bold mt-3">{totalTeam?.length || 0}</p>
        </div>

        {/* Users */}
        <div className="rounded-2xl border bg-card text-card-foreground shadow hover:shadow-lg transition-all p-6 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-green-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Users
            </span>
          </div>
          <p className="text-3xl font-bold mt-3">{users?.length || 0}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-muted/50 rounded-2xl shadow-sm p-6">
        <ChartStat />
      </div>
    </div>
  );
};

export default HomeAdmin;

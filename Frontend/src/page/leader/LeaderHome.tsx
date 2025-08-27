"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LeaderChart } from "@/components/LeaderChart";
import { useUserData } from "@/hooks/useUserData";

interface TeamMember {
  id: string;
  name: string;
}

const LeaderHome = () => {
  const { userId } = useParams();
  const { tasks, setTasks, setIsLoading } = useUserData();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [chartData, setChartData] = useState<{ name: string; tasks: number }[]>(
    []
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const resTasks = await fetch(
          `${import.meta.env.VITE_API_URL}/leader/${userId}/home`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify("Get all Teams"),
          }
        );
        const dataTasks = await resTasks.json();
        console.log(dataTasks, "tasks");
        setTasks(dataTasks.allTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const resMembers = await fetch(
          `${import.meta.env.VITE_API_URL}/leader/${userId}/home`,
          { method: "GET", credentials: "include" }
        );
        const dataMembers = await resMembers.json();
        console.log(dataMembers, "data");
        setMembers(dataMembers.allTeam);
      } catch (err) {
        console.error("Failed to fetch members", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
    fetchMembers();
  }, [userId, setTasks, setIsLoading]);

  // recalc chart data when tasks or members change
  useEffect(() => {
    if (tasks?.length && members.length) {
      const chart = members?.map((member) => {
        const assignedTasks = tasks.filter((task) =>
          task.assignedTo.some((u: TeamMember) => u.id === member.id)
        );
        return { name: member.name, tasks: assignedTasks.length };
      });
      setChartData(chart);
    }
  }, [tasks, members]);

  return (
    <div className="p-4">
      <LeaderChart chartData={chartData} />
    </div>
  );
};

export default LeaderHome;

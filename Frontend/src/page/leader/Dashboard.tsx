import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserData } from "@/hooks/useUserData";
import { LucideWorkflow, Users } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Tasks",
      url: "tasks",
      icon: LucideWorkflow,
    },

    {
      title: "Teams",
      url: "teams",
      icon: Users,
    },
  ],
};

export default function DashboardLeader() {
  const { setActiveUser, setTeams, setIsLoading } = useUserData();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/leader/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.status === 401) {
          window.location.href = "/";
        }
        const data = await res.json();

        setActiveUser(data?.activeLeader);
        // Fetch Teams

        const resTeam = await fetch(
          `${import.meta.env.VITE_API_URL}/leader/${userId}/teams`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (resTeam.status === 401) {
          window.location.href = "/";
        }

        const dataTeam = await resTeam.json();
        setTeams(dataTeam.allTeam);
      } catch (error) {
        console.log("Unable to get Data for the Leader", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [userId, setActiveUser, setTeams, setIsLoading]);

  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {/* Add search Bar */}
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

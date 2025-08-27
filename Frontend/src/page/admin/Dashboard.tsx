import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserData } from "@/hooks/useUserData";
import { Briefcase, LucideWorkflow, Users } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Team Leaders",
      url: "#",
      icon: Briefcase,
      isActive: true,
      items: [
        {
          title: "Requested to Join",
          url: "requested",
        },
        {
          title: "Leaders List",
          url: "leaders",
        },
      ],
    },
    {
      title: "Tasks",
      url: "tasks",
      icon: LucideWorkflow,
    },

    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Users",
          url: "users",
        },
        {
          title: "Admins",
          url: "createAdmin",
        },
      ],
    },
  ],
};

export default function DashboardAdmin() {
  const { setActiveUser } = useUserData();
  const { userId } = useParams<{ userId: string }>();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.status === 401) {
          window.location.href = "/";
        }
        const data = await res.json();
        setActiveUser(data?.activeAdmin);
      } catch (error) {
        console.log("Unable to get Data for the Admin", error);
      }
    };
    getUser();
  }, [userId, setActiveUser]);
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
          </div>
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}

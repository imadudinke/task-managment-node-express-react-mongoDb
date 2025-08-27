import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronDown,
  ListChecks,
  Mail,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { CreateTeam } from "@/components/CreatTeam";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import type { Task, Team } from "@/types";
import { useUserData } from "@/hooks/useUserData";

export const TeamList = () => {
  const { userId } = useParams();
  const [openTasks, setOpenTasks] = useState(false);
  const [tasksAssigned] = useState<Task[]>([]);
  const { teams, setTeams } = useUserData();
  const [selectTeam, setSelectedTeam] = useState<Team>();
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const { setIsLoading } = useUserData();
  useEffect(() => {
    const getTeams = async () => {
      try {
        setIsLoading(true);
        const res1 = await fetch(
          `${import.meta.env.VITE_API_URL}/leader/${userId}/teams`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data1 = await res1.json();
        setTeams(data1.allTeam);
      } catch (error) {
        console.log("Unable to get Tasks Data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getTeams();
  }, [userId, setTeams, setIsLoading]);

  const handleBrowse = async (team: Team) => {
    setSelectedTeam(team);

    setIsBrowseOpen(true);
  };

  const handleDelete = async (teamId: string) => {
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/leader/${userId}/teams`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ teamId }),
      });
      setTeams((pervTeam) => pervTeam.filter((team) => team.id !== teamId));
      toast.success("Successfully Deleted");
    } catch (error) {
      console.log(`Unable to delete the task ${teamId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mx-5 p-5 min-h-screen rounded-xl border">
      <div className="flex justify-end">
        <CreateTeam />
      </div>

      {teams?.length === 0 ||
        (!teams && (
          <p className="text-sm text-muted-foreground text-center">
            No Team found pleas create one :).
          </p>
        ))}

      {/* List */}
      <div className=" space-y-1.5 ">
        {teams?.map((team) => (
          <div
            key={team?.id}
            className=" border rounded-lg  p-1 px-3 shadow-sm"
          >
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {team?.name ? team.name.charAt(0).toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold  text-sm text-gray-900 dark:text-white">
                      {team?.name}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => team?.id && handleBrowse(team)}
                    >
                      Browse team
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => team.id && handleDelete(team.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Created {new Date(team?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Tablet Layout - Compact Grid */}
            <div className="hidden sm:block lg:hidden">
              <div className="grid grid-cols-[60px_1fr_auto_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {team?.name?.charAt(0).toUpperCase() ?? ""}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {team?.name}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {team?.email}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {new Date(team?.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => team?.id && handleBrowse(team)}
                      >
                        Browse team
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => team?.id && handleDelete(team.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Full Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[60px_200px_250px_120px_160px_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {team?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                    {(team?.name ?? "").length > 20
                      ? (team?.name ?? "")?.slice(0, 20) + "...."
                      : team?.name ?? ""}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {team?.email}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(team?.createdAt)?.toLocaleDateString()}
                </span>

                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => team?.id && handleBrowse(team)}
                      >
                        Browse team
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => team?.id && handleDelete(team?.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Dialog open={isBrowseOpen} onOpenChange={setIsBrowseOpen}>
          <DialogContent className="max-w-lg">
            {selectTeam && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Users className="w-5 h-5 text-blue-500" />
                    {selectTeam?.name}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {selectTeam?.email}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 font-medium">
                    <ListChecks className="w-5 h-5 text-green-500" />
                    {tasksAssigned.length} tasks assigned
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <strong>Created:</strong>{" "}
                    {selectTeam?.createdAt &&
                      new Date(selectTeam?.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Collapsible dropdown for tasks */}
                <Collapsible open={openTasks} onOpenChange={setOpenTasks}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 w-full justify-between"
                    >
                      <span>Show Assigned Tasks</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openTasks ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2 pl-2">
                    {tasksAssigned.length > 0 ? (
                      tasksAssigned.map((task, i) => (
                        <p
                          key={i}
                          className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 transition text-sm"
                        >
                          • {task.title}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No tasks assigned
                      </p>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

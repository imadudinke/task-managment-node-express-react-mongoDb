import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Filter } from "lucide-react";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";

type LeaderType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string; // comes from API
  subTeams?: number; // mock for now
};

const LeaderList = () => {
  const { userId } = useParams();
  const [leaders, setLeaders] = useState<LeaderType[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "subTeams">("name");
  const { setIsLoading } = useUserData();
  useEffect(() => {
    const getLeaders = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}/leaders`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.status === 401) {
          window.location.href = "/";
        }
        const data = await res.json();

        setLeaders(data.leaders);
      } catch (error) {
        console.log("Unable to get Leaders Data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getLeaders();
  }, [userId, setIsLoading]);

  const handleDelete = async (leaderId: string) => {
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/admin/${userId}/teams`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ leaderId }),
      });
      setLeaders((perLeader) => perLeader.filter((lid) => lid.id !== leaderId));
      toast.success("SuccessFully Deleted");
    } catch (error) {
      console.log("Unable to delete", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter by search
  let filtered = leaders.filter((leader) =>
    leader.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "subTeams") {
      return (b.subTeams || 0) - (a.subTeams || 0);
    }
    return 0;
  });

  return (
    <div className="space-y-4 mx-5 p-5 min-h-screen rounded-xl border">
      <div className="flex justify-between">
        <Input
          placeholder="Search leader..."
          value={search}
          className="max-w-[20vw]"
          onChange={(e) => setSearch(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("date")}>
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("subTeams")}>
              Number of Sub Teams
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((leader) => (
          <div
            key={leader.id}
            className="dark:bg-gray-900/30 rounded-xl border p-4 shadow-sm"
          >
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              {/* Top row: Avatar + Name + Menu */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={leader.avatar} />
                    <AvatarFallback>
                      {leader.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {leader.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {leader.email}
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
                    <DropdownMenuItem className="text-red-600">
                      <button onClick={() => handleDelete(leader.id)}>
                        Delete
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bottom row: Date + Teams */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Joined {new Date(leader.createdAt).toLocaleDateString()}
                </span>
                <span className="font-medium">Teams: {leader.subTeams}</span>
              </div>
            </div>

            {/* Tablet Layout - Compact Grid */}
            <div className="hidden sm:block lg:hidden">
              <div className="grid grid-cols-[60px_1fr_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={leader.avatar} />
                  <AvatarFallback>
                    {leader.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {leader.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {leader.email}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {new Date(leader.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-red-600">
                        <button onClick={() => handleDelete(leader.id)}>
                          Delete
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Full Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[60px_200px_250px_120px_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={leader.avatar} />
                  <AvatarFallback>
                    {leader.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {leader.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {leader.email}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(leader.createdAt).toLocaleDateString()}
                </span>

                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-red-600">
                        <button onClick={() => handleDelete(leader.id)}>
                          Delete
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No leaders found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LeaderList;

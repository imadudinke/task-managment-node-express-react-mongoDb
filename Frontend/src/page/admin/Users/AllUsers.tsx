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
import { Filter, Shield, Crown, Users, Hourglass, XCircle } from "lucide-react";

// Role helpers
type UserRole = "Admin" | "Leader" | "Team" | "Request" | "Rejected";

const normalizeRole = (role: string): UserRole => {
  const v = (role || "Leader").toLowerCase();
  if (v.includes("admin")) return "Admin";
  if (v.includes("leader")) return "Leader";
  if (v.includes("team")) return "Team";
  if (v.includes("request")) return "Request";
  if (v.includes("reject")) return "Rejected";
  return "Leader";
};

const roleInfo = (role: UserRole) => {
  switch (role) {
    case "Admin":
      return { label: "Admin", Icon: Shield, color: "text-amber-600" };
    case "Leader":
      return { label: "Leader", Icon: Crown, color: "text-purple-600" };
    case "Team":
      return { label: "Team", Icon: Users, color: "text-blue-600" };
    case "Request":
      return { label: "Request", Icon: Hourglass, color: "text-yellow-600" };
    case "Rejected":
      return { label: "Rejected", Icon: XCircle, color: "text-red-600" };
    default:
      return { label: "Leader", Icon: Crown, color: "text-purple-600" };
  }
};

const RolePill = ({ role }: { role: string }) => {
  const r = roleInfo(normalizeRole(role));
  const Icon = r.Icon;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-xs text-muted-foreground">
      <Icon className={`h-3 w-3 ${r.color}`} />
      <span>{r.label}</span>
    </span>
  );
};

type LeaderType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  role: string;
  subTeams?: number; // mock or from API
};

const AllUsers = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState<LeaderType[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "date" | "role">("name");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}/users`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        setUsers(data.users);
      } catch (error) {
        console.log("Unable to get Users Data", error);
      }
    };
    getUsers();
  }, [userId]);

  // Filter by search
  let filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sortBy === "role") {
      return normalizeRole(a.role).localeCompare(normalizeRole(b.role));
    }
    return 0;
  });

  return (
    <div className="space-y-4 mx-5 p-5 min-h-screen rounded-xl border">
      <div className="flex justify-between">
        <Input
          placeholder="Search user..."
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

            <DropdownMenuItem onClick={() => setSortBy("role")}>
              Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="dark:bg-gray-900/30 rounded-xl border p-4 shadow-sm"
          >
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              {/* Top row: Avatar + Name + Menu */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </p>
                    <div className="mt-1">
                      <RolePill role={user.role} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="  text-right text-sm text-gray-600 dark:text-gray-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Tablet Layout - Compact Grid */}
            <div className="hidden sm:block lg:hidden">
              <div className="grid grid-cols-[60px_1fr_auto_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate flex items-center gap-2">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    <RolePill role={user.role} />
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Full Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-[100px_200px_250px_120px_160px] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <RolePill role={user.role} />
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No user found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

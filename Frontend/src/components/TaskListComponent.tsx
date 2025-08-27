import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ClipboardList,
  FileText,
  Calendar,
  Users,
} from "lucide-react";
import CreateTask from "@/components/CreateTask";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";
import type { Task, Team } from "@/types";

const TasksListComponent = ({ user }: { user: string }) => {
  const { userId } = useParams();
  const { tasks, setTasks } = useUserData();
  const [search, setSearch] = useState("");

  // modal states
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isBrowseOpen, setIsBrowseOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // edit form state
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/${user}/${userId}/tasks`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data.allTasks);
        setTasks(data.allTasks);
      } catch (error) {
        console.log("Unable to get Tasks Data", error);
      }
    };
    getTasks();
  }, [userId, setTasks, user]);

  const filtered = useMemo(() => {
    return tasks?.filter((task) =>
      task?.title?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [tasks, search]);

  const handleBrowse = (task: Task) => {
    setSelectedTask(task);
    setIsBrowseOpen(true);
  };

  const handleEdit = (task: Task) => {
    console.log(task);
    setSelectedTask(task);
    setTitle(task.title || "");
    setStatus(task.status || "");
    setDescription(task.description || "");
    setIsEditOpen(true);
  };

  // Save
  const handleSaveEdit = async (taskId: string) => {
    if (!selectedTask) return;

    try {
      const updatedTask = {
        ...selectedTask,
        title,
        status,
        description,
      };

      // send to backend
      await fetch(`${import.meta.env.VITE_API_URL}/${user}/${userId}/tasks`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, status, taskId }),
      });

      // update local state
      setTasks((prev: Task[]) =>
        prev.map((t: Task) => (t.id === selectedTask.id ? updatedTask : t))
      );
      toast.success("SuccessFully Saved");
      setIsEditOpen(false);
    } catch (err) {
      console.log("Failed to update task", err);
    }
  };

  const handleDelete = async (taskId: string) => {
    console.log("Delete task", taskId);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/leader/${userId}/tasks`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ taskId }),
      });
      setTasks((pervTask) => pervTask.filter((tas) => tas.id !== taskId));
      toast.success("SuccessFully Deleted");
    } catch (error) {
      console.log(`Unable to delete the task ${taskId}:`, error);
    }
  };

  return (
    <div className="space-y-4 mx-5 p-5 min-h-screen rounded-xl border">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search tasks by title..."
          value={search}
          className="sm:max-w-[20vw]"
          onChange={(e) => setSearch(e.target.value)}
        />

        {user === "leader" ? <CreateTask /> : ""}
        {/* Exceptional */}
      </div>

      {/* List */}
      <div className=" space-y-1.5 ">
        {filtered?.map((task) => (
          <div key={task.id} className=" border rounded-lg  p-1 px-3 shadow-sm">
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {task.title?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold  text-sm text-gray-900 dark:text-white">
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {task.status}
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
                      onClick={() => task.id && handleBrowse(task)}
                    >
                      Browse task
                    </DropdownMenuItem>
                    {user === "leader" && (
                      <DropdownMenuItem
                        onClick={() => task.id && handleEdit(task)}
                      >
                        Edit task
                      </DropdownMenuItem>
                    )}
                    {user === "leader" && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => task.id && handleDelete(task.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="font-medium">
                  Sub Teams: {task.assignedTo?.length || 0}
                </span>
              </div>
            </div>
            {/* Tablet Layout - Compact Grid */}
            <div className="hidden sm:block lg:hidden">
              <div className="grid grid-cols-[60px_1fr_auto_auto] items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {task.title?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {task.status}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Sub Teams: {task.assignedTo?.length || 0}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => task.id && handleBrowse(task)}
                      >
                        Browse task
                      </DropdownMenuItem>
                      {user === "leader" && (
                        <DropdownMenuItem
                          onClick={() => task.id && handleEdit(task)}
                        >
                          Edit task
                        </DropdownMenuItem>
                      )}
                      {user === "leader" && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => task.id && handleDelete(task.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
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
                    {task.title?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                    {task.title ?? "".length > 20
                      ? task.title?.slice(0, 20) + "...."
                      : task.title}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-serif capitalize text-gray-600 dark:text-gray-400">
                    {task.status}
                  </p>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Sub Teams: {task.assignedTo?.length || 0}
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
                        onClick={() => task.id && handleBrowse(task)}
                      >
                        Browse task
                      </DropdownMenuItem>
                      {user === "leader" && (
                        <DropdownMenuItem
                          onClick={() => task.id && handleEdit(task)}
                        >
                          Edit task
                        </DropdownMenuItem>
                      )}
                      {user === "leader" && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => task.id && handleDelete(task.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Dialog open={isBrowseOpen} onOpenChange={setIsBrowseOpen}>
          <DialogContent className="max-w-lg rounded-2xl shadow-xl p-6 space-y-4">
            {selectedTask && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-500" />
                    {selectedTask?.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedTask.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : selectedTask.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedTask.status}
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 text-sm text-gray-700">
                  <p className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span>
                      <strong>Description:</strong>{" "}
                      {selectedTask.description || "N/A"}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>
                      <strong>Created:</strong>{" "}
                      {selectedTask?.createdAt &&
                        new Date(selectedTask?.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  <p className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span>
                      <strong>Assigned Teams:</strong>{" "}
                      {selectedTask.assignedTo?.length > 0
                        ? selectedTask.assignedTo
                            .map((u: Team) => u.name)
                            .join(", ")
                        : "None"}
                    </span>
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        {/* Edit Task Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>
                Update the details of the task.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
              <Select onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedTask?.id && handleSaveEdit(selectedTask?.id)
                }
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {filtered?.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TasksListComponent;

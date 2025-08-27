import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignees] = useState<
    { name: string; id: string; email: string }[]
  >([]);
  const { userId } = useParams();
  const { setTasks, setIsLoading, teams } = useUserData();

  const toggleAssignee = (
    team: { name: string; id: string; email: string },
    checked: boolean
  ) => {
    setAssignees((prev) =>
      checked
        ? [...prev, { name: team.name, id: team.id, email: team.email }]
        : prev.filter((n) => n.id !== team.id)
    );
  };

  const removeAssignee = (id: string) => {
    setAssignees((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setOpen(false);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/leader/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, assignedTo, description }),
      });
      const data = await res.json();
      setTasks((prevTasks) => [...prevTasks, data.task]);
      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      setAssignees([]);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as Error).message
          : "Something went wrong";
      toast.error(errorMessage);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-amber-900 text-white hover:bg-amber-800">
            New Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Task and Assign it</DialogTitle>
            <DialogDescription>
              Provide task details and select team members to assign.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                placeholder="Describe the task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Assign to</Label>

              {assignedTo.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 rounded-md border">
                  {assignedTo.map((team) => (
                    <span
                      key={team.id}
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs"
                    >
                      {team.name}
                      <button
                        type="button"
                        className="ml-1 rounded hover:bg-muted p-0.5"
                        onClick={() => removeAssignee(team.id)}
                        aria-label={`Remove ${team.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full justify-between"
                  >
                    {assignedTo.length > 0
                      ? `${assignedTo.length} selected`
                      : "Select team members"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Team Members</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {teams?.map((team) => (
                    <DropdownMenuCheckboxItem
                      key={team.id}
                      checked={assignedTo.some(
                        (assignee) => assignee.id === team.id
                      )}
                      onCheckedChange={(checked) => {
                        if (team.name && team.email && team.id) {
                          const newTeam = {
                            name: team.name,
                            email: team.email,
                            id: team.id,
                          };
                          return toggleAssignee(newTeam, Boolean(checked));
                        }
                      }}
                    >
                      {team.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTask;

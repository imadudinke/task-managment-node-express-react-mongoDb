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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useParams } from "react-router";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";

export const CreateTeam = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userId } = useParams();
  const { setTeams, setIsLoading } = useUserData();
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setOpen(false);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/leader/${userId}/teams`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      //   console.log(data);
      toast.success("Team created successfully");
      setTeams((pervTeam) => [...pervTeam, data.newTeam]);
      setName("");
      setPassword("");
      setEmail("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-800 hover:bg-green-700 text-white">
            New Team
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Team and Assign it Task</DialogTitle>
            <DialogDescription>Provide Detail Information .</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-Name">Name</Label>
              <Input
                id="team-Name"
                placeholder="Enter Team name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-description">Email</Label>
              <Input
                id="task-description"
                placeholder="neja@gmaol.com"
                value={email}
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Team-password">Password</Label>
              <Input
                id="task-description"
                placeholder="***********1"
                value={password}
                type="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="submit">Create Team</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

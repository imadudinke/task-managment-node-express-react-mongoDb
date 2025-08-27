"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Check, Mail, X } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
//
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RequestedUser = {
  name: string;
  email: string;
  role: string;
  id: string;
  createdAt: string;
};

const Requested = () => {
  const { userId } = useParams();
  const [requested, setRequested] = useState<RequestedUser[]>([]);

  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}/requested`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (res.status === 401) {
          window.location.href = "/";
        }
        const data = await res.json();
        console.log(data, "------Requested");
        setRequested(data.requested);
      } catch (error) {
        console.log("Unable to get Requested Data", error);
      }
    };
    getRequest();
  }, [userId]);

  const handleRequest = async (id: string, role: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/${userId}/requested`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, role }),
        }
      );

      const data = await res.json();
      console.log(data, "------Requested");

      // Remove the accepted/rejected request from UI
      setRequested((oldReq) => oldReq.filter((req) => req.id !== id));
      if (role === "leader") {
        toast.success("Accepted successfully");
      } else {
        toast.error("Rejected successfully");
      }
    } catch (error) {
      console.log("Unable to update request", error);
      toast.error("Action failed. Try again.");
    }
  };

  const getInitials = useMemo(
    () => (name: string) =>
      name
        ?.trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p.charAt(0).toUpperCase())
        .join("") || "NA",
    []
  );

  const formatRelativeTime = useMemo(
    () => (iso: string | undefined) => {
      if (!iso) return "";
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return new Date(iso).toLocaleString();
      const diffMs = Date.now() - date.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      if (hours < 12) {
        return `${Math.max(1, hours)}h ago`;
      }
      return date.toLocaleDateString();
    },
    []
  );

  if (requested?.length === 0 || !requested)
    return (
      <div className="p-10 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <div className="px-6">
            <div className="leading-none font-semibold">
              You're all caught up
            </div>
            <div className="text-muted-foreground text-sm">
              No pending access requests.
            </div>
          </div>
        </Card>
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-1  gap-4 sm:gap-6">
      {requested.map((req) => (
        <Card
          key={req.id}
          className="rounded-2xl font-serif border bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:ring-1 hover:ring-primary/20 w-full backdrop-blur supports-[backdrop-filter]:bg-card/60"
        >
          <div className="flex items-center justify-evenly gap-4 px-6">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getInitials(req.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{req.name}</div>
              </div>
              <div className="text-xs text-muted-foreground truncate flex items-center gap-2">
                <Mail className="size-3.5" />
                <a
                  href={`mailto:${req.email}`}
                  className="truncate hover:underline underline-offset-4"
                >
                  {req.email}
                </a>
              </div>
            </div>

            <span className="bg-secondary font-mono text-secondary-foreground text-xs px-2 py-1 rounded-full whitespace-nowrap">
              {formatRelativeTime(req.createdAt)}
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => handleRequest(req.id, "leader")}
                      size="sm"
                      className="gap-1.5 rounded-full"
                    >
                      <Check className="size-4" /> Accept
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve request</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => handleRequest(req.id, "rejected")}
                      size="sm"
                      className="gap-1.5 rounded-full"
                    >
                      <X className="size-4" /> Decline
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Decline request</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Requested;

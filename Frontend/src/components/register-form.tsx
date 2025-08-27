import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserData } from "@/hooks/useUserData";
// import { useNavigate } from "react-router-dom";

interface RegisterFormProps extends React.ComponentProps<"div"> {
  user?: string;
  userId?: string;
}

export function RegisterForm({
  user = "normal",
  userId = "",
  className,
  ...props
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading } = useUserData();
  const navigate = useNavigate();
  let role: string;
  if (user === "admin") role = "admin";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (user !== "admin") {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password, role }),
        });
        const data = await res.json();
        console.log(data);
        navigate("/requested");
      } else {
        await fetch(
          `${import.meta.env.VITE_API_URL}/admin/${userId}/createAdmin`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
          }
        );
        toast.success("SuccessFully Created");
        navigate(`/admin/${userId}`);
      }
    } catch (error) {
      console.log("Error Unable to handle the  Registeration :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent
          className={`grid p-0 ${
            user !== "admin" ? " md:grid-cols-2 w-[70vw]" : "grid-cols-1"
          }`}
        >
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  {user !== "admin" ? "Create your Account" : "Create admin"}
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Neja Aberar"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-700 duration-150 text-white"
              >
                Register
              </Button>

              {user !== "admin" && (
                <div className="text-center text-sm">
                  Do you have an account?{" "}
                  <a href="/" className="underline underline-offset-4">
                    login
                  </a>
                </div>
              )}
            </div>
          </form>
          {user !== "admin" && (
            <div className="bg-muted relative hidden md:block">
              <img
                src="/Imag1.png"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          )}
        </CardContent>
      </Card>
      {user !== "admin" && (
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      )}
    </div>
  );
}

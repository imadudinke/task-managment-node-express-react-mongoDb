import { useUserData } from "@/hooks/useUserData";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const LogOutUser = () => {
  const { setIsLoading } = useUserData();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: "GET",
        credentials: "include",
      });

      navigate("/");

      toast.success("Logout SuccessFull");
    } catch (error) {
      console.log("Unable to Logout", error);
      toast.error("Unable to logout Please try again later");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      onClick={handleLogOut}
      className="flex items-center w-full  jus-between p-1 gap-2"
    >
      <LogOut />
      Log out
    </div>
  );
};

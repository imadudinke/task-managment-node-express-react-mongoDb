import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ClipboardList, Activity } from "lucide-react";

const SubTeamHome = () => {
  return (
    <div className="min-h-screen bg-black/60 flex flex-col items-center justify-start px-4 py-8">
      {/* Welcome Section */}
      <section className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Welcome to ImTech Solutions
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-200/90">
          This is your sub-team homepage. Here you can view your tasks, team
          members, and activities to stay organized and collaborate efficiently.
        </p>
      </section>

      {/* Overview Cards */}
      <section className="w-full max-w-4xl px-2">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center p-6 w-full h-full">
            <CardHeader className="flex flex-col items-center gap-2 w-full">
              <Users className="w-6 h-6 text-blue-500" />
              <CardTitle className="text-center w-full">Team Members</CardTitle>
              <CardDescription className="text-center w-full">
                View your team members
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 w-full h-full">
            <CardHeader className="flex flex-col items-center gap-2 w-full">
              <ClipboardList className="w-6 h-6 text-green-500" />
              <CardTitle className="text-center w-full">Tasks</CardTitle>
              <CardDescription className="text-center w-full">
                Check your assigned tasks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex flex-col items-center justify-center p-6 w-full h-full">
            <CardHeader className="flex flex-col items-center gap-2 w-full">
              <Activity className="w-6 h-6 text-purple-500" />
              <CardTitle className="text-center w-full">Activities</CardTitle>
              <CardDescription className="text-center w-full">
                See recent team activities
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SubTeamHome;

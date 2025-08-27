"use client";

import { Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import CreateTask from "./CreateTask";

// Example chart data (replace with your team data)

const chartConfig = {
  tasks: {
    label: "Tasks Assigned",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Define the type for a single data point in the chart
interface ChartDataItem {
  name: string;
  tasks: number;
}

// Define the type for the component's props
interface LeaderChartProps {
  chartData: ChartDataItem[];
}

export function LeaderChart({ chartData }: LeaderChartProps) {
  return (
    <Card className="w-full h-screen  max-w-full">
      <CardHeader className="flex justify-between">
        <div className="space-y-2">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Tasks per Team Member
          </CardTitle>
          <CardDescription>Distribution of assigned tasks</CardDescription>
        </div>

        <CreateTask />
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full h-[400px] max-h-screen"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                barSize={100}
                dataKey="tasks"
                fill="var(--color-tasks)"
                radius={8}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

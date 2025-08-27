import { XCircle } from "lucide-react";

const Rejected: React.FC = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-2 rounded-md border border-red-500  p-6 text-center text-red-800">
      <XCircle className="h-8 w-8" />
      <h2 className="text-lg font-semibold">Request Rejected</h2>
      <p>Sorry, your request was rejected. You cannot continue.</p>
    </div>
  );
};

export default Rejected;

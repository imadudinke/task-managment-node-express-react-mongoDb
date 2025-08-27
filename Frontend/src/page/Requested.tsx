import { Info } from "lucide-react";

const RequestedToJoin = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2 rounded-md border border-amber-500  p-6 text-center text-amber-800">
      <Info className="h-8 w-8" />
      <h2 className="text-lg font-semibold">Request Pending</h2>
      <p>Please wait until the Admin approves your request.</p>
    </div>
  );
};

export default RequestedToJoin;

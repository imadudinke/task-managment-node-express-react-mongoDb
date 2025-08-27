import { RegisterForm } from "@/components/register-form";
import React from "react";
import { useParams } from "react-router";

const CreateAdmin: React.FC = () => {
  const { userId } = useParams();
  return (
    <div className="flex px-10  justify-center">
      <RegisterForm
        className="w-[300px] md:min-w-[550px]"
        user="admin"
        userId={userId}
      />
    </div>
  );
};

export default CreateAdmin;

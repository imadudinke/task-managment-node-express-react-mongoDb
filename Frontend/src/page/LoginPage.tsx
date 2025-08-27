import { LoginForm } from "@/components/login-form";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center  h-screen w-full">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

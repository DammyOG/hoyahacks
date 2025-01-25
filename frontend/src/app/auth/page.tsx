"use client";

import LoginForm from "@/components/signinForm";
import SignupForm from "@/components/signupForm";
import { signIn, signUp } from "@/lib/Auth";
import React from "react";

enum FormType {
  LOGIN = "login",
  SIGNUP = "signup",
}

const Page = () => {
  const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN);

  const handleFormType = () => {
    setFormType(formType === FormType.LOGIN ? FormType.SIGNUP : FormType.LOGIN);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {FormType.LOGIN === formType ? (
        <LoginForm handleClick={signIn} />
      ) : (
        <SignupForm handleClick={signUp} />
      )}
    </div>
  );
};

export default Page;

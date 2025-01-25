"use client";
import SignupForm from "@/components/signupForm";
import { signIn, signUp } from "@/lib/Auth";
import { Amplify } from "aws-amplify";
import awsConfig from "@/lib/aws-exports";
import SigninForm from "@/components/signinForm";
import Home from "./home/page";

Amplify.configure(awsConfig as any);

const page = () => {
  return <Home />;
};

export default page;

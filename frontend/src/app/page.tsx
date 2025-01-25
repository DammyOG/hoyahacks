"use client";
import SignupForm from "@/components/signupForm";
import Image from "next/image";

export default function Home() {
    const handleClick = () => {
      console.log("Clicked");
    }

  return (
    <>
    <SignupForm handleClick= {handleClick}/>
    </>
  );
}

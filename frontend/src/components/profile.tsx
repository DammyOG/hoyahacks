"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    const data = localStorage.getItem("userSession");
    if (data) {
      const { name, email } = JSON.parse(data);
      setName(name);
      setEmail(email);
    }
  }, []);

  const handleSignOut = async () => {
    localStorage.removeItem("userSession");
    // Dispatch event before navigation
    window.dispatchEvent(new Event("sessionUpdate"));
    await router.push("/auth");
  };

  return (
    <div className="">
      <Avatar
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {isOpen && (
        <div
          className="absolute top-full right-1 bg-white/90 text-black rounded-lg shadow-md p-2 w-36 text-sm"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            {name}
          </div>
          <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            {email}
          </div>
          <div
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-red-600"
            onClick={handleSignOut}
          >
            Sign out
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

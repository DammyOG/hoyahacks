"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleMouseEnter = () => setIsOpen(true); // Open dropdown on hover
    const handleMouseLeave = () => setIsOpen(false); // Close dropdown when not interacting

    return (
        <div className="">
            {/* Avatar */}
            <Avatar
                onMouseEnter={handleMouseEnter}
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute top-full right-1 bg-white/90 text-black rounded-lg  shadow-md p-2 w-36 text-sm"
                    onMouseEnter={handleMouseEnter} // Keep dropdown open when hovered
                    onMouseLeave={handleMouseLeave} // Close dropdown when not hovered
                >
                    <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Name</div>
                    <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Email</div>
                    <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Settings</div>
                </div>
            )}
        </div>
    );
};

export default Profile;

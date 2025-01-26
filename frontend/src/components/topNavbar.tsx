"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchComp from "./searchComp";
import Profile from "./profile";

const TopNavbar = () => {
    const [hasSession, setHasSession] = React.useState(false);

    React.useEffect(() => {
        // Check for session
        const checkSession = () => {
            setHasSession(!!localStorage.getItem("userSession"));
        };

        // Initial check
        checkSession();

        // Listen for session updates
        window.addEventListener("sessionUpdate", checkSession);
        return () => window.removeEventListener("sessionUpdate", checkSession);
    }, []);

    return (
        <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="flex justify-between h-16 items px-10 w-full">
                <div className="flex gap-4">
                    <Link href="/" className="flex items-center" prefetch={false}>
                        <img src="/images/icon.png" alt="icon" className="h-10 w-auto" />
                    </Link>
                    <Link
                        href="/"
                        className="font-medium flex items-center text-xl italic tra
                            nsition-colors"
                        prefetch={false}
                    >
                        Funells
                    </Link>
                </div>
                {/* <SearchComp /> */}
                <div className="flex items-center gap-4">
                    {hasSession ? (
                        <Profile />
                    ) : (
                        <>
                            <Link href="/auth?form=sign-in" prefetch={false}>
                                <Button variant="main" size="sm">
                                    Sign in
                                </Button>
                            </Link>
                            <Link href="/auth?form=sign-up" prefetch={false}>
                                <Button variant="outline" size="sm">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;

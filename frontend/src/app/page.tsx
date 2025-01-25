"use client";

import React from "react";
import { usePathname } from "next/navigation";


export default function Home() {
    // usePathname lets us know which route is currently active
    const pathname = usePathname();

    return (
        <main className="bg-gray-100 dark:bg-gray-900">
            {/* Since we're on the home route, we can directly render the Homepage component */}

        </main>
    );
}
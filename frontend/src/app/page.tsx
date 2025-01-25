"use client";

import React from "react";
import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function Home() {
    // usePathname lets us know which route is currently active
    const pathname = usePathname();

    return (
        <main>
            {/* Since we're on the home route, we can directly render the Homepage component */}

        </main>
    );
}
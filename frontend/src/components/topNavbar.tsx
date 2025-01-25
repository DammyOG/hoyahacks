import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Input } from "./ui/input"
import SearchComp from "./searchComp"
import Image from "next/image"

export default function TopNavbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm dark:bg-gray-950/90 ">
            <div className="w-full mx-auto px-10">
                <div className="flex justify-between h-16 items">
                    <div className="flex gap-4">
                        <Link href="#" className="flex items-center" prefetch={false}>
                            <img src="/images/icon.png" alt="icon" className="h-10 w-auto" />
                        </Link>
                        <Link
                            href="#"
                            className="font-medium flex items-center text-xl italic tra
                            nsition-colors hover:underline"
                            prefetch={false}
                        >
                            Funells
                        </Link>
                    </div>
                    <SearchComp />
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                            Sign in
                        </Button>
                        <Button size="sm">Sign up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>


    )
}
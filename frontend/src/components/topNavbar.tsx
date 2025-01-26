import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { Input } from "./ui/input"
import SearchComp from "./searchComp"
import Image from "next/image"
import Profile from "./profile"



export default function TopNavbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 h-16 bg-white shadow-sm dark:bg-gray-950/90 ">
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
                <SearchComp />
                <div className="flex items-center gap-4">
                    <Link href="/auth?form=sign-in" prefetch={false}>
                        <Button variant="main" size="sm">
                            Sign in
                        </Button>
                    </Link>
                    <Link href="/auth?form=sign-up" prefetch={false}>
                        <Button variant="outline" size="sm">Sign up</Button>
                    </Link>

                    <Profile />
                </div>
            </div>
        </nav>
    )
}
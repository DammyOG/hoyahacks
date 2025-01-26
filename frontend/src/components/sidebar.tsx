"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed h-screen w-64 bg-gray-800/30 backdrop-blur-md border-r border-gray-700/50 text-white p-6">
      <nav className="space-y-4">
        <Link href="/" className="block hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link
          href="/projects"
          className="block hover:text-blue-400 transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/uploadtest"
          className="block hover:text-blue-400 transition-colors"
        >
          Upload Project
        </Link>
      </nav>
    </div>
  );
}

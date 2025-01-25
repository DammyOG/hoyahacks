"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Sidebar from "../components/ui/sidebar";


export default function Home() {
  // usePathname lets us know which route is currently active
  const pathname = usePathname();
  

  // Function to render the appropriate content based on the current path
  const renderContent = () => {
    switch (pathname) {
      case '/':
        return <HomeContent />;
      case '/discussions':
        return <DiscussionsContent />;
      default:
        return <HomeContent />;
    }
  };
  return (
    <div className="min-h-screen bg-slate-900">
    <Sidebar />
    {/* Main content area - notice the margin-left matches sidebar width */}
    <main className="ml-16 transition-all duration-300">
      {renderContent()}
    </main>
  </div>
  );
}



// components/HomeContent.tsx
const HomeContent = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-6">Welcome Home</h1>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-slate-200">
        <p className="mb-4">This is your dashboard homepage. Here you might see:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example content cards */}
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <p>Your latest actions and updates would appear here</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Quick Stats</h3>
            <p>Key metrics and statistics would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};



// components/DiscussionsContent.tsx
const DiscussionsContent = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-6">Discussions</h1>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-slate-200">
        <div className="space-y-4">
          {/* Example discussion threads */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Discussion Thread {i}</h3>
              <p className="text-sm text-slate-300">
                This is an example discussion topic. In a real application, 
                this would show actual discussion content.
              </p>
              <div className="mt-3 text-xs text-slate-400">
                Last reply: 2 hours ago • 5 participants
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
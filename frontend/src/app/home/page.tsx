// app/page.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../../components/ui/sidebar";
import HeroComp from "@/components/heroComp";
import Spotlight from "@/components/spotlight";
import TrendDiscussions from "@/components/trendDiscussions";

export default function Home() {
  const pathname = usePathname();

  // Function to render the appropriate content based on the current path
  const renderContent = () => {
    switch (pathname) {
      case "/":
        return <HomeContent />;
      case "/discussions":
        return <DiscussionsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 w-full">
      <Sidebar />
      {/* Main content area - notice the margin-left matches sidebar width */}
      <main className="ml-12 transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}

// components/HomeContent.tsx
const HomeContent = () => {
  return (
    <>
      <HeroComp />
      <div className="p-8 flex justify-center">
        <Spotlight />
        <TrendDiscussions />
      </div>
    </>
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
                This is an example discussion topic. In a real application, this
                would show actual discussion content.
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

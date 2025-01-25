"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const pathname = usePathname();

    // Handle the delayed collapse effect when mouse leaves the sidebar
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!isHovering) {
            timeoutId = setTimeout(() => {
                setIsExpanded(false);
            }, 500);
        } else {
            setIsExpanded(true);
        }

        // Clean up the timeout if the component unmounts or hover state changes
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isHovering]);

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Discussions', icon: MessageCircle, path: '/discussions' }
    ];

    return (
        // Fixed wrapper to define the sidebar's space
        <div
            className="fixed h-screen z-40"
            style={{ width: isExpanded ? '16rem' : '4rem' }}
        >
            {/* Sidebar with contained glass effect */}
            <div
                className={`absolute left-0 top-0 h-full transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-64' : 'w-16'}
          rounded-tr-2xl rounded-br-2xl
          flex flex-col
          bg-white/60
          backdrop-blur-lg
          border-r border-white/20 
          shadow-lg`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Navigation section */}
                <nav className="flex-1 p-4 space-y-4">
                    {navItems.map(({ name, icon: Icon, path }) => (
                        <Link
                            key={path}
                            href={path}
                            className={`flex items-center p-2 rounded-lg transition-all duration-300
                ${pathname === path ?
                                    'bg-white/50 text-blue-600 shadow-sm' :
                                    'hover:bg-white/30 text-gray-700'}
                ${isExpanded ? 'justify-start' : 'justify-center'}`}
                        >
                            <Icon className="w-6 h-6" />
                            {isExpanded && (
                                <span className="ml-3 font-medium transition-opacity duration-300">
                                    {name}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>


            </div>
        </div>
    );
};

export default Sidebar;
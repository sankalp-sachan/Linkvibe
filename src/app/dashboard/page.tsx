"use client";

import React, { useEffect, useState } from 'react';
import { LinkEditor } from '@/components/LinkEditor';
import { ProfileSettings } from '@/components/ProfileSettings';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { ExternalLink, LayoutDashboard, Settings, PieChart, LogOut, Share2 } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('links');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for zustand persist to hydrate
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [user, router, isHydrated]);

  if (!isHydrated || !user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar / Bottom Nav */}
        <div className="md:w-64 bg-white border-r md:h-screen md:sticky md:top-0 px-4 md:px-6 py-4 md:py-10 flex flex-row md:flex-col items-center md:items-stretch justify-around md:justify-start border-t md:border-t-0 fixed bottom-0 left-0 right-0 md:relative z-50">
            <div className="hidden md:flex items-center gap-3 mb-10 px-2 lg:flex">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-extrabold text-2xl tracking-tighter text-gray-900">LinkVibe</h1>
            </div>

            <nav className="flex flex-row md:flex-col flex-1 gap-2 w-full max-w-sm md:max-w-none">
                <button 
                    onClick={() => setActiveTab('links')}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 flex-1 md:flex-initial px-3 py-2 md:py-3 rounded-xl font-bold md:font-semibold transition-all ${activeTab === 'links' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 md:text-gray-500 hover:bg-gray-50'}`}
                >
                    <LayoutDashboard className="w-6 h-6 md:w-5 md:h-5" />
                    <span className="text-[10px] md:text-sm">Links</span>
                </button>
                <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 flex-1 md:flex-initial px-3 py-2 md:py-3 rounded-xl font-bold md:font-semibold transition-all ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 md:text-gray-500 hover:bg-gray-50'}`}
                >
                    <PieChart className="w-6 h-6 md:w-5 md:h-5" />
                    <span className="text-[10px] md:text-sm">Stats</span>
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 flex-1 md:flex-initial px-3 py-2 md:py-3 rounded-xl font-bold md:font-semibold transition-all ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 md:text-gray-500 hover:bg-gray-50'}`}
                >
                    <Settings className="w-6 h-6 md:w-5 md:h-5" />
                    <span className="text-[10px] md:text-sm">Account</span>
                </button>
            </nav>

            <button 
                onClick={logout}
                className="hidden md:flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all mt-auto"
            >
                <LogOut className="w-5 h-5 font-bold" />
                Sign Out
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto mb-20 md:mb-0">
            <header className="h-16 md:h-20 bg-white border-b px-4 md:px-10 flex items-center justify-between sticky top-0 z-40">
                <div className="hidden sm:block">
                   <span className="text-gray-400 font-medium">Dashboard / </span>
                   <span className="text-gray-900 font-bold capitalize">{activeTab}</span>
                </div>
                <div className="sm:hidden flex items-center gap-2">
                    <div className="bg-indigo-600 p-1.5 rounded-lg flex md:hidden lg:hidden">
                        <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                     <button 
                        onClick={() => {
                            const url = `${window.location.origin}/${user.username}`;
                            navigator.clipboard.writeText(url);
                            alert('Profile link copied to clipboard!');
                        }}
                        className="bg-indigo-50 text-indigo-600 p-2.5 md:px-4 md:py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors"
                     >
                        <Share2 className="w-4 h-4 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Share</span>
                     </button>
                     <a 
                        href={`/${user.username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
                     >
                         <div className="text-right mr-1 hidden xs:block">
                             <p className="text-sm font-bold text-gray-900 leading-none mb-1 text-ellipsis overflow-hidden max-w-[80px]">@{user.username}</p>
                             <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight">View Profile</p>
                         </div>
                         <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg select-none border-2 border-white shadow-sm overflow-hidden">
                             {user?.avatar ? (
                                 <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" />
                             ) : (
                                 user.username.charAt(0).toUpperCase()
                             )}
                         </div>
                     </a>
                </div>
            </header>

            <main className="p-4 md:p-10 max-w-5xl mx-auto w-full">
                {activeTab === 'links' && <LinkEditor />}
                {activeTab === 'analytics' && <div className="text-center py-20 bg-white rounded-2xl border shadow-sm"><p className="text-gray-400 font-medium px-4">Detailed charts go here. (Require more data to display meaningfully)</p></div>}
                {activeTab === 'settings' && <ProfileSettings />}
            </main>
        </div>
    </div>
  );
}

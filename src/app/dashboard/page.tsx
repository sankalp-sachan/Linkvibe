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

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r h-screen sticky top-0 px-6 py-10 flex flex-col">
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-extrabold text-2xl tracking-tighter text-gray-900">LinkVibe</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <button 
                    onClick={() => setActiveTab('links')}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl font-semibold transition-all ${activeTab === 'links' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Links
                </button>
                <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl font-semibold transition-all ${activeTab === 'analytics' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <PieChart className="w-5 h-5" />
                    Analytics
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl font-semibold transition-all ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    <Settings className="w-5 h-5" />
                    Settings
                </button>
            </nav>

            <button 
                onClick={logout}
                className="flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all mt-auto"
            >
                <LogOut className="w-5 h-5 font-bold" />
                Sign Out
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
            <header className="h-20 bg-white border-b px-10 flex items-center justify-between">
                <div>
                   <span className="text-gray-400 font-medium">Dashboard / </span>
                   <span className="text-gray-900 font-bold capitalize">{activeTab}</span>
                </div>
                <div className="flex items-center gap-4">
                     <button 
                        onClick={() => {
                            const url = `${window.location.origin}/${user.username}`;
                            navigator.clipboard.writeText(url);
                            alert('Profile link copied to clipboard!');
                        }}
                        className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-100 transition-colors"
                     >
                        <Share2 className="w-4 h-4" />
                        Share
                     </button>
                     <a 
                        href={`/${user.username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                     >
                         <div className="text-right mr-1">
                             <p className="text-sm font-bold text-gray-900 leading-none mb-1">@{user.username}</p>
                             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">View Profile</p>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg select-none">
                             {user.username.charAt(0).toUpperCase()}
                         </div>
                     </a>
                </div>
            </header>

            <main className="p-10 max-w-5xl mx-auto w-full">
                {activeTab === 'links' && <LinkEditor />}
                {activeTab === 'analytics' && <div className="text-center py-20 bg-white rounded-2xl border shadow-sm"><p className="text-gray-400 font-medium">Detailed charts go here. (Require more data to display meaningfully)</p></div>}
                {activeTab === 'settings' && <ProfileSettings />}
            </main>
        </div>
    </div>
  );
}

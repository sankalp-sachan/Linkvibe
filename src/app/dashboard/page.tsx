"use client";

import React, { useEffect, useState } from 'react';
import { LinkEditor } from '@/components/LinkEditor';
import { ProfileSettings } from '@/components/ProfileSettings';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  LayoutDashboard, 
  Settings, 
  PieChart, 
  LogOut, 
  Share2, 
  ExternalLink,
  ChevronRight,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api, { getPublicAssetUrl } from '@/lib/axios';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('links');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      router.push('/login');
    }
  }, [user, router, isHydrated]);

  if (!isHydrated || !user) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
    </div>
  );

  const navItems = [
    { id: 'links', label: 'Links', icon: LayoutDashboard },
    { id: 'analytics', label: 'Stats', icon: PieChart },
    { id: 'settings', label: 'Account', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans selection:bg-brand-primary/10">
        {/* Modern Sidebar */}
        <aside className="md:w-[280px] bg-white border-r border-slate-200/60 md:h-screen md:sticky md:top-0 px-4 py-8 flex flex-row md:flex-col items-center md:items-stretch justify-around md:justify-start fixed bottom-0 left-0 right-0 md:relative z-50 premium-shadow md:shadow-none">
            <div className="hidden md:flex items-center gap-4 mb-12 px-2">
                <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    <img src="/logo.png" className="w-8 h-8 object-contain" alt="LinkVibe Logo" />
                </div>
                <div>
                   <h1 className="font-display font-black text-2xl tracking-tight text-slate-900">LinkVibe</h1>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dashboard Pro</p>
                </div>
            </div>

            <nav className="flex flex-row md:flex-col flex-1 gap-1.5 w-full">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`relative flex flex-col md:flex-row items-center gap-1 md:gap-4 flex-1 md:flex-initial px-4 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 group ${activeTab === item.id ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                    >
                      {activeTab === item.id && (
                        <motion.div 
                          layoutId="activeNav"
                          className="absolute inset-0 bg-brand-primary/5 rounded-2xl hidden md:block"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className={`w-6 h-6 md:w-5 md:h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? 'text-brand-primary' : ''}`} />
                      <span className="text-[10px] md:text-base">{item.label}</span>
                      {activeTab === item.id && (
                        <div className="hidden md:block ml-auto w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                      )}
                    </button>
                  );
                })}
            </nav>

            <button 
                onClick={logout}
                className="hidden md:flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all mt-auto group"
            >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Sign Out
            </button>
        </aside>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col overflow-y-auto mb-24 md:mb-0">
            <header className="h-16 md:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
                <div className="hidden sm:flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                   <h2 className="text-slate-900 font-display font-black text-xl md:text-2xl capitalize">{activeTab}</h2>
                </div>
                
                <div className="flex items-center gap-3 md:gap-6">
                     <button 
                        onClick={() => {
                            const url = `${window.location.origin}/${user.username}`;
                            navigator.clipboard.writeText(url);
                            toast.success('Link copied to clipboard!');
                        }}
                        className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2.5 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                     >
                        <Share2 className="w-4 h-4" />
                        <span className="hidden lg:inline">Share Profile</span>
                     </button>

                     <div className="w-px h-8 bg-slate-200 hidden md:block" />

                     <a 
                        href={`/${user.username}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group"
                     >
                         <div className="text-right hidden sm:block">
                             <p className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-brand-primary transition-colors">@{user.username}</p>
                             <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                <span>Live View</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                             </div>
                         </div>
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-slate-100 group-hover:ring-2 ring-brand-primary ring-offset-2 transition-all overflow-hidden bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center border-2 border-white shadow-sm">
                             {user?.avatar ? (
                                 <img src={getPublicAssetUrl(user.avatar) || ''} className="w-full h-full object-cover" alt="avatar" />
                             ) : (
                                 <span className="text-brand-primary text-xl font-black">{user.username.charAt(0).toUpperCase()}</span>
                             )}
                         </div>
                     </a>
                </div>
            </header>

            <main className="p-6 md:p-12 max-w-6xl mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'links' && <LinkEditor />}
                    {activeTab === 'analytics' && (
                      <div className="glass-card rounded-[2.5rem] p-12 text-center border-dashed border-2 flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-brand-primary/5 flex items-center justify-center">
                          <PieChart className="w-10 h-10 text-brand-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-display font-black text-slate-900 mb-2">Analytics Gathering</h3>
                          <p className="text-slate-500 max-w-sm">We're collecting engagement data for your profile. Check back shortly for detailed performance insights.</p>
                        </div>
                      </div>
                    )}
                    {activeTab === 'settings' && <ProfileSettings />}
                  </motion.div>
                </AnimatePresence>
            </main>
        </div>
    </div>
  );
}

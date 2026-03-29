"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, Share2, Globe, Link as LinkIcon, User, Sparkles, Instagram, Twitter, Github, Linkedin, Youtube, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { getPublicAssetUrl } from '@/lib/axios';

export default function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = React.use(params);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api';
        const { data } = await axios.get(`${apiUrl}/p/${username}`);
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Profile not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Accessing Space...</p>
    </div>
  );

  if (error || !profile) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc] p-6 text-center">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 max-w-sm">
            <h1 className="text-4xl font-display font-black text-slate-900 mb-4">404</h1>
            <p className="text-slate-500 font-medium mb-8">This digital space hasn't been claimed or has drifted into the void.</p>
            <a href="/" className="btn-premium bg-brand-primary py-3 px-8 rounded-2xl inline-block">Return Home</a>
        </div>
    </div>
  );

  const { user, links } = profile;
  
  const themes: any = {
      default: "from-slate-50 to-slate-100 text-slate-900",
      dark: "from-slate-950 to-slate-900 text-white",
      vibrant: "from-brand-primary via-brand-secondary to-brand-accent text-white",
      minimal: "from-white to-slate-50 text-slate-800",
  };

  const currentTheme = themes[user.theme] || themes.default;
  const isDark = user.theme === 'dark' || user.theme === 'vibrant';

  const socialIcons: any = {
    instagram: Instagram,
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    youtube: Youtube
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme} py-20 px-4 relative overflow-hidden font-sans`}>
       {/* Ambient Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary rounded-full blur-[120px] animate-pulse delay-1000" />
       </div>

       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="max-w-xl mx-auto flex flex-col items-center relative z-10"
       >
            {/* User Profile Card */}
            <div className="flex flex-col items-center mb-12">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl mb-6 relative group"
                >
                    {user.avatar ? (
                        <img src={getPublicAssetUrl(user.avatar) || ''} alt={user.displayName} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-md text-inherit font-display font-black text-4xl uppercase">
                            {user.username.charAt(0)}
                        </div>
                    )}
                </motion.div>

                <h1 className="text-3xl font-display font-black mb-3 tracking-tight">
                  {user.displayName || `@${user.username}`}
                </h1>
                
                {user.displayName && (
                  <p className="text-sm font-bold opacity-60 uppercase tracking-[0.2em] mb-4">@{user.username}</p>
                )}

                {user.bio && (
                  <p className="text-center font-medium opacity-80 max-w-sm mb-8 leading-relaxed px-4 italic">
                    "{user.bio}"
                  </p>
                )}

                {/* Social Connectors */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                    {Object.entries(user.socialLinks || {}).map(([platform, url]) => {
                        if (!url) return null;
                        const Icon = socialIcons[platform] || LinkIcon;
                        return (
                          <motion.a 
                            key={platform}
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={url as string} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-lg"
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        );
                    })}
                </div>
            </div>

            {/* Links Collection */}
            <div className="w-full space-y-4 px-2">
                {links.filter((l: any) => l.isActive).map((link: any, index: number) => (
                    <motion.a
                        key={link._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        href={`${process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api'}/p/r/${link._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            group block w-full py-5 px-8 relative overflow-hidden
                            rounded-[1.75rem] shadow-xl backdrop-blur-xl border transition-all
                            ${isDark ? 'bg-white/10 border-white/10 hover:bg-white/20' : 'bg-white/80 border-white hover:bg-white'}
                        `}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <span className="text-lg font-display font-black tracking-tight">{link.title}</span>
                            <div className="w-10 h-10 rounded-xl bg-slate-900/5 group-hover:bg-brand-primary/10 flex items-center justify-center transition-colors">
                               <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:text-brand-primary transition-all" />
                            </div>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </motion.a>
                ))}
            </div>

            <div className="mt-20 flex flex-col items-center gap-6">
                <a 
                    href="/register" 
                    className="group relative flex items-center gap-3 px-10 py-4 rounded-[2rem] font-display font-black text-sm shadow-2xl transition-all bg-white text-slate-900 hover:scale-105 active:scale-95"
                >
                    <Sparkles className="w-4 h-4 text-brand-primary group-hover:rotate-12 transition-transform" />
                    Build Your Own Space
                </a>
                
                <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default select-none pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">LinkVibe Infinite</span>
                </div>
            </div>
       </motion.div>
    </div>
  );
}

const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8L6 21" />
  </svg>
);

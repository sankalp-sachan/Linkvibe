"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { 
  ExternalLink, 
  Share2, 
  Globe, 
  Link as LinkIcon, 
  User, 
  Sparkles, 
  Instagram, 
  Twitter, 
  Github, 
  Linkedin, 
  Youtube, 
  Loader2, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Rocket
} from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin"></div>
            <Rocket className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="mt-8 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Synchronizing Vibe...</p>
    </div>
  );

  if (error || !profile) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border border-slate-100 max-w-md relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Globe className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-4xl font-display font-black text-slate-900 mb-4 tracking-tight">Lost in Orbit</h1>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">This digital space hasn't been claimed yet or has drifted into the void of the internet.</p>
            <a href="/" className="btn-premium bg-slate-900 w-full py-4 rounded-2xl inline-flex items-center justify-center gap-3">
               Build Your Own Space
               <ArrowUpRight className="w-5 h-5" />
            </a>
        </motion.div>
    </div>
  );

  const { user, links } = profile;
  
  const themes: any = {
      default: "from-slate-50 via-white to-slate-50",
      dark: "from-slate-950 via-slate-900 to-slate-950 text-white",
      vibrant: "from-indigo-600 via-purple-600 to-pink-600 text-white",
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
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme} py-24 px-4 relative overflow-hidden font-sans`}>
       {/* Ambient Dynamic Background */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[140px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
       </div>

       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="max-w-xl mx-auto flex flex-col items-center relative z-10"
       >
            {/* Elegant Header */}
            <header className="flex flex-col items-center mb-16 text-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
                  className="relative group mb-8"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <div className="w-36 h-36 rounded-[2.8rem] overflow-hidden border-4 border-white shadow-2xl relative bg-white flex items-center justify-center">
                        {user.avatar ? (
                            <img src={getPublicAssetUrl(user.avatar) || ''} alt={user.displayName} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                        ) : (
                            <span className="text-slate-900 font-display font-black text-5xl">{user.username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute bottom-0 right-0 bg-indigo-600 p-2.5 rounded-2xl border-4 border-white shadow-lg translate-x-1 translate-y-1">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 leading-none"
                >
                  {user.displayName || `@${user.username}`}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="text-xs font-black uppercase tracking-[0.4em] opacity-40 mb-6 flex items-center gap-2"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  Creator Digital Home
                </motion.p>

                {user.bio && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="glass-card bg-white/40 backdrop-blur-md rounded-2xl px-6 py-4 border-white/20 max-w-md shadow-sm"
                  >
                    <p className="font-medium opacity-80 leading-relaxed text-sm md:text-base italic">
                      "{user.bio}"
                    </p>
                  </motion.div>
                )}

                {/* Social Bar */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">
                    {Object.entries(user.socialLinks || {}).map(([platform, url], i) => {
                        if (!url) return null;
                        const Icon = socialIcons[platform] || LinkIcon;
                        return (
                          <motion.a 
                            key={platform}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 + (i * 0.05), type: "spring" }}
                            whileHover={{ y: -6, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={url as string} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`
                                w-14 h-14 rounded-[1.3rem] shadow-xl border backdrop-blur-xl flex items-center justify-center transition-all
                                ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-white shadow-slate-200/50 hover:shadow-indigo-100'}
                            `}
                          >
                            <Icon className="w-6 h-6" />
                          </motion.a>
                        );
                    })}
                </div>
            </header>

            {/* Links Ecosystem */}
            <div className="w-full space-y-4 px-2">
                {links.filter((l: any) => l.isActive).map((link: any, index: number) => (
                    <motion.a
                        key={link._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (index * 0.1) }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        href={`${process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api'}/p/r/${link._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            group block w-full py-6 px-10 relative overflow-hidden
                            rounded-[2.2rem] shadow-2xl backdrop-blur-xl border transition-all duration-300
                            ${isDark ? 'bg-white/10 border-white/10 hover:bg-white/15' : 'bg-white/90 border-white shadow-slate-200/40 hover:shadow-indigo-100 hover:border-indigo-100'}
                        `}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <span className="text-xl font-display font-black tracking-tight">{link.title}</span>
                            <div className="w-10 h-10 rounded-2xl bg-slate-900/5 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                               <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-all group-hover:rotate-12" />
                            </div>
                        </div>
                        {/* Interactive Sparkle Effect on hover */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    </motion.a>
                ))}

                {links.length === 0 && (
                  <div className="text-center py-20 opacity-20 grayscale grayscale-0">
                    <Rocket className="w-20 h-20 mx-auto mb-4 animate-float" />
                    <p className="font-black uppercase tracking-[0.5em] text-xs">Awaiting Digital Launch</p>
                  </div>
                )}
            </div>

            {/* Premium CTA Footer */}
            <footer className="mt-28 flex flex-col items-center gap-10">
                <Link 
                    href="/register" 
                    className="group relative flex items-center gap-4 px-10 py-5 rounded-[2.5rem] font-display font-black text-sm shadow-[0_25px_50px_-12px_rgba(0,0,0,0.1)] transition-all bg-slate-950 text-white hover:scale-105 active:scale-95 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-white relative z-10" />
                    <span className="relative z-10">Get Your Link Free</span>
                    <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all relative z-10" />
                </Link>
                
                <div className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-700 cursor-default select-none group">
                    <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-900">Powered by LinkVibe Infinite</span>
                </div>
            </footer>
       </motion.div>
    </div>
  );
}

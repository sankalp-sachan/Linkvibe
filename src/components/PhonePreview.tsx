"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Share2 } from 'lucide-react';
import { getPublicAssetUrl } from '@/lib/axios';

interface PhonePreviewProps {
  user: any;
  links: any[];
}

export const PhonePreview = ({ user, links }: PhonePreviewProps) => {
  return (
    <div className="sticky top-12 hidden xl:block w-[340px]">
      <div className="text-center mb-6">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Live Simulator</p>
         <div className="flex items-center justify-center gap-2 text-brand-primary">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs font-bold font-display">Syncing Changes</span>
         </div>
      </div>

      <div className="relative mx-auto w-[300px] h-[600px] bg-slate-900 rounded-[3rem] p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-4 border-slate-800">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-b-2xl z-20"></div>
         
         <div className="w-full h-full bg-slate-50 rounded-[2.2rem] overflow-hidden relative overflow-y-auto no-scrollbar">
            {/* User Profile Area */}
            <div className="pt-14 pb-8 px-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-primary to-brand-secondary mx-auto mb-4 p-1 shadow-xl">
                    <div className="w-full h-full rounded-[1.3rem] bg-white overflow-hidden flex items-center justify-center border-2 border-white">
                        {user?.avatar ? (
                            <img src={getPublicAssetUrl(user.avatar)} className="w-full h-full object-cover" alt="avatar" />
                        ) : (
                            <span className="text-brand-primary text-2xl font-black">{user.username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                </div>
                <h3 className="font-display font-black text-slate-900 text-lg leading-tight">@{user.username}</h3>
                <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">{user.bio || 'LinkVibe Creator'}</p>
            </div>

            {/* Links Area */}
            <div className="px-5 space-y-3 pb-10">
                {links.filter(l => l.active !== false).map((link, idx) => (
                    <motion.div
                        key={link._id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="w-full bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm flex items-center justify-center text-center cursor-default hover:border-brand-primary transition-colors"
                    >
                        <span className="text-xs font-black text-slate-800 truncate">{link.title || 'Untitled Link'}</span>
                    </motion.div>
                ))}
                
                {links.length === 0 && (
                    <div className="py-10 text-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Share2 className="w-4 h-4 text-slate-300" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No Links Yet</p>
                    </div>
                )}
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-slate-900/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <div className="bg-slate-900 p-1 rounded-md">
                        <ExternalLink className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-[8px] font-black text-slate-900 tracking-tighter uppercase">LinkVibe</span>
                </div>
            </div>
         </div>
      </div>
      
      <div className="mt-8 flex flex-col gap-3">
         <button className="w-full py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all">
            Download QR Code
         </button>
      </div>
    </div>
  );
};

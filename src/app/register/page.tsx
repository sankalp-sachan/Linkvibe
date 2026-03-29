"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Sparkles, Eye, EyeOff, CheckCircle2, ArrowRight, Loader2, Globe, Rocket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser, setTokens } = useAuthStore();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    if (isHydrated && user) {
      router.push('/dashboard');
    }
  }, [user, isHydrated, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { 
        username: username.toLowerCase(), 
        email: email.toLowerCase(), 
        password 
      });
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Welcome to the elite! Your space is ready.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong. Let\'s try that again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[120px] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-card rounded-[3rem] p-10 md:p-14 relative z-10 border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col items-center mb-12 text-center">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="bg-indigo-600 p-4 rounded-[1.5rem] mb-8 shadow-2xl shadow-indigo-200"
            >
                <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-display font-black tracking-tight text-slate-900 mb-2 leading-none">
              Start Your <span className="text-gradient">Empire.</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Claim your unique digital identity</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex justify-between items-center">
                  Universal Handle
                  {username.length >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </label>
                <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-sm pointer-events-none">
                        vibe/
                    </div>
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} 
                        required 
                        className="glass-input h-14 rounded-2xl pl-16 pr-6 text-slate-900 font-bold placeholder:text-slate-200"
                        placeholder="username"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Digital Coordinate</label>
                <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-bold placeholder:text-slate-300"
                    placeholder="name@email.com"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Security Protocol</label>
                <div className="relative group">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        minLength={6}
                        className="glass-input h-14 rounded-2xl px-6 pr-14 text-slate-900 font-bold placeholder:text-slate-300"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-300 hover:text-indigo-600 transition-colors rounded-xl"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full bg-slate-900 text-white font-black h-16 rounded-[1.3rem] flex items-center justify-center gap-3 group transition-all shadow-xl hover:shadow-slate-200 mt-4"
            >
                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                      Initialize Space
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </motion.button>
        </form>

        <div className="mt-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
            Already vibrating? {" "}
            <Link 
              href="/login" 
              className="text-indigo-600 hover:underline underline-offset-4 decoration-2"
            >
              Sign In
            </Link>
        </div>
      </motion.div>

      {/* Trust Indicator */}
      <div className="mt-12 flex items-center gap-8 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default">
        <div className="flex items-center gap-2">
           <ShieldCheck className="w-4 h-4 text-emerald-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">End-to-End Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
           <Globe className="w-4 h-4 text-indigo-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Distributed Node</span>
        </div>
      </div>
    </div>
  );
}

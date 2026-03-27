"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Sparkles, Eye, EyeOff, CheckCircle2, ArrowRight, Loader2, Globe } from 'lucide-react';
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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[140px] animate-float" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full glass-card rounded-[2.5rem] p-8 md:p-12 relative z-10 premium-shadow"
      >
        <div className="flex flex-col items-center mb-10 text-center">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-brand-secondary p-4 rounded-3xl mb-6 shadow-2xl shadow-brand-secondary/20"
            >
                <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-display font-black tracking-tight text-gray-900 mb-2">
              Start Your <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-slate-500 font-medium">Claim your unique digital identity today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center justify-between">
                  <span>Your Unique URL</span>
                  {username.length >= 3 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </label>
                <div className="relative group overflow-hidden rounded-2xl border border-slate-200 focus-within:ring-4 focus-within:ring-brand-primary/10 focus-within:border-brand-primary/50 transition-all bg-white/50 backdrop-blur-md">
                    <div className="absolute left-0 top-0 bottom-0 px-4 flex items-center bg-slate-100/50 border-r border-slate-200 text-slate-400 text-sm font-bold select-none whitespace-nowrap overflow-hidden max-w-[100px] sm:max-w-none">
                        linkvibe/
                    </div>
                    <Input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} 
                        required 
                        className="border-none focus:ring-0 h-14 pl-[90px] pr-6 text-slate-900 font-bold placeholder:font-medium placeholder:text-slate-300 w-full bg-transparent"
                        placeholder="username"
                    />
                </div>
                <p className="text-[10px] text-slate-400 ml-1 uppercase tracking-widest font-black">lowercase, numbers, & underscores</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Space</label>
                <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="you@universe.com"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Master Password</label>
                <div className="relative group">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        minLength={6}
                        className="glass-input h-14 rounded-2xl px-6 pr-14 text-slate-900 font-medium placeholder:text-slate-400"
                        placeholder="Min. 6 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-secondary transition-colors hover:bg-slate-50 rounded-xl"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full btn-premium h-14 flex items-center justify-center gap-2 mt-4 bg-brand-primary hover:bg-brand-primary/90"
            >
                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <span className="flex items-center gap-2 text-lg">
                      Create My Space
                      <ArrowRight className="w-6 h-6" />
                    </span>
                )}
            </motion.button>
        </form>

        <div className="mt-10 text-center flex flex-col items-center gap-2">
            <span className="text-slate-400 font-medium">Already have a space?</span>
            <Link 
              href="/login" 
              className="text-brand-primary font-bold hover:text-brand-secondary transition-colors underline-offset-4 hover:underline"
            >
              Sign In Here
            </Link>
        </div>
      </motion.div>

      {/* Trust Indicator */}
      <div className="mt-8 flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="flex items-center gap-2">
           <Globe className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Global Network</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-300" />
        <div className="flex items-center gap-2">
           <CheckCircle2 className="w-4 h-4" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Encrypted</span>
        </div>
      </div>
    </div>
  );
}

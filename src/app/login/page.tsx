"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Sparkles, Eye, EyeOff, ArrowRight, Loader2, Rocket } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Access Granted! Welcome back.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed. Please try again.');
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
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="bg-indigo-600 p-4 rounded-[1.5rem] mb-8 shadow-2xl shadow-indigo-200"
            >
                <Rocket className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-display font-black tracking-tight text-slate-900 mb-2 leading-none">
              Welcome <span className="text-gradient">Home.</span>
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Personal Creator Access Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Digital Identity
                </label>
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
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Security Pin</label>
                  <Link href="/forgot-password" title="Recover your account" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
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
                className="w-full bg-slate-900 text-white font-black h-16 rounded-[1.3rem] flex items-center justify-center gap-3 group transition-all shadow-xl hover:shadow-slate-200"
            >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Unlock Space
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
            </motion.button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Don't have a vibe? {" "}
              <Link 
                href="/register" 
                className="text-indigo-600 hover:underline decoration-2 underline-offset-4"
              >
                Create One Now
              </Link>
            </p>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-12 flex items-center gap-3 opacity-20 grayscale cursor-default select-none group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
        <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-900">LinkVibe Secure Authentication</span>
      </div>
    </div>
  );
}

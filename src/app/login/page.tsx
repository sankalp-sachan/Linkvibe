"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Sparkles, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full glass-card rounded-[2.5rem] p-8 md:p-12 relative z-10 premium-shadow"
      >
        <div className="flex flex-col items-center mb-10 text-center">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-brand-primary p-4 rounded-3xl mb-6 shadow-2xl shadow-brand-primary/20 rotate-0 hover:rotate-6 transition-transform duration-500"
            >
                <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-display font-black tracking-tight text-gray-900 mb-2">
              Hello <span className="text-gradient">Again</span>
            </h1>
            <p className="text-slate-500 font-medium">Log in to your premium LinkVibe space</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                  Email Address
                </label>
                <motion.div whileFocus="focus">
                  <Input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-medium placeholder:text-slate-400"
                      placeholder="alex@example.com"
                  />
                </motion.div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                    <Input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="glass-input h-14 rounded-2xl px-6 pr-14 text-slate-900 font-medium placeholder:text-slate-400"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-slate-400 hover:text-brand-primary transition-colors hover:bg-slate-50 rounded-xl"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="flex justify-end pt-1">
              <Link href="#" className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors">
                Forgot Password?
              </Link>
            </div>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="w-full btn-premium h-14 flex items-center justify-center gap-2 group overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Login Securely
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
            </motion.button>
        </form>

        <div className="mt-10 text-center flex flex-col items-center gap-2">
            <span className="text-slate-400 font-medium">New around here?</span>
            <Link 
              href="/register" 
              className="bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary px-6 py-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
            >
              Request Access
            </Link>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-8 relative z-10 flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default select-none">
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
        <span className="text-sm font-black tracking-widest uppercase">LinkVibe Secure Layer</span>
      </div>
    </div>
  );
}

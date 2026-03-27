"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Mail, KeyRound, Lock, ArrowRight, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Recovery code sent to your email!');
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send recovery code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 4) {
      setStep(3);
    } else {
      toast.error('Please enter the 4-digit code.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code, newPassword });
      toast.success('Password reset successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-brand-primary/5 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] bg-brand-secondary/5 rounded-full blur-[140px] animate-pulse delay-1000" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card rounded-[2.5rem] p-8 md:p-12 relative z-10 premium-shadow"
      >
        <div className="flex flex-col items-center mb-10 text-center">
            <motion.div 
               className="bg-white p-3 rounded-2xl mb-6 shadow-xl border border-slate-100"
               layoutId="reset-icon"
            >
                {step === 1 && <Mail className="w-8 h-8 text-brand-primary" />}
                {step === 2 && <KeyRound className="w-8 h-8 text-brand-secondary" />}
                {step === 3 && <Lock className="w-8 h-8 text-emerald-500" />}
            </motion.div>
            
            <h1 className="text-3xl font-display font-black tracking-tight text-gray-900 mb-2">
                {step === 1 && "Reset Access"}
                {step === 2 && "Security Code"}
                {step === 3 && "New Identity"}
            </h1>
            <p className="text-slate-500 font-medium">
                {step === 1 && "Enter your email to receive a recovery code"}
                {step === 2 && `Enter the 4-digit code sent to ${email}`}
                {step === 3 && "Secure your space with a new password"}
            </p>
        </div>

        <AnimatePresence mode="wait">
            {step === 1 && (
                <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSendCode} 
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <Input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-medium placeholder:text-slate-400"
                            placeholder="you@example.com"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-premium h-14 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Send Code <ArrowRight className="w-5 h-5" /></>}
                    </button>
                    <div className="text-center pt-4">
                        <Link href="/login" className="text-sm font-bold text-slate-400 hover:text-brand-primary flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Login
                        </Link>
                    </div>
                </motion.form>
            )}

            {step === 2 && (
                <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleVerifyCode} 
                    className="space-y-6 text-center"
                >
                    <div className="flex justify-center gap-4 mb-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-12 h-16 rounded-2xl bg-slate-100/50 border-2 border-slate-200 flex items-center justify-center text-2xl font-black text-slate-900 shadow-inner">
                                {code[i] || ""}
                            </div>
                        ))}
                    </div>
                    <Input 
                        type="text" 
                        maxLength={4}
                        value={code} 
                        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} 
                        required 
                        className="opacity-0 absolute h-0 w-0"
                        autoFocus
                    />
                    <p className="text-xs font-bold text-slate-400 mb-6 tracking-wide">CLICK ABOVE TO TYPE CODE</p>
                    <button
                        type="submit"
                        className="w-full btn-premium h-14 bg-brand-secondary hover:bg-brand-secondary/90 shadow-brand-secondary/20"
                    >
                        Verify Identity
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-sm font-bold text-slate-400 hover:text-slate-600 px-4 py-2"
                    >
                        Try different email
                    </button>
                </motion.form>
            )}

            {step === 3 && (
                <motion.form 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleResetPassword} 
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">New Password</label>
                            <Input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                                minLength={6}
                                className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-medium placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Confirm Identity</label>
                            <Input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-medium placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-premium h-14 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Finalize Reset"}
                    </button>
                    <p className="text-[10px] text-center font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Code Verified Successfully
                    </p>
                </motion.form>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-8 relative z-10 flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default select-none">
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
        <span className="text-sm font-black tracking-widest uppercase">LinkVibe Secure Recovery</span>
      </div>
    </div>
  );
}

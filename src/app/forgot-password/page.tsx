"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Mail, KeyRound, Lock, ArrowRight, Loader2, ArrowLeft, CheckCircle2, Sparkles, Rocket } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[120px] -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card rounded-[3rem] p-10 md:p-14 relative z-10 border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col items-center mb-12 text-center">
            <motion.div 
               className="bg-indigo-600 p-4 rounded-[1.3rem] mb-8 shadow-2xl shadow-indigo-100"
               layoutId="reset-icon"
            >
                {step === 1 && <Mail className="w-8 h-8 text-white" />}
                {step === 2 && <KeyRound className="w-8 h-8 text-white" />}
                {step === 3 && <Lock className="w-8 h-8 text-white" />}
            </motion.div>
            
            <h1 className="text-3xl font-display font-black tracking-tight text-slate-900 mb-2 leading-none">
                {step === 1 && "Reset Access"}
                {step === 2 && "Security Code"}
                {step === 3 && "New Identity"}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">
                {step === 1 && "Identification Required"}
                {step === 2 && `Sequence Verification`}
                {step === 3 && "Encryption Update"}
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
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-black h-16 rounded-[1.3rem] flex items-center justify-center gap-3 group shadow-xl hover:shadow-slate-200"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Request Code <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                    </motion.button>
                    <div className="text-center pt-4">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Safety
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
                    className="space-y-8 text-center"
                >
                    <div className="flex justify-center gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-14 h-20 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-3xl font-display font-black text-indigo-600 shadow-xl shadow-slate-100">
                                {code[i] || ""}
                            </div>
                        ))}
                    </div>
                    <div className="relative">
                        <Input 
                            type="text" 
                            maxLength={4}
                            value={code} 
                            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} 
                            required 
                            className="opacity-0 absolute inset-0 z-50 cursor-pointer h-20 w-full"
                            autoFocus
                        />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 animate-pulse">Click above to enter sequence</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-black h-16 rounded-[1.3rem] shadow-xl shadow-indigo-100 hover:bg-indigo-700"
                    >
                        Initialize Unlock
                    </motion.button>
                    <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Reset Coordinate
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
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Protocol</label>
                            <Input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                                minLength={6}
                                className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-bold placeholder:text-slate-300"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Protocol</label>
                            <Input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                className="glass-input h-14 rounded-2xl px-6 text-slate-900 font-bold placeholder:text-slate-300"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white font-black h-16 rounded-[1.3rem] shadow-xl shadow-emerald-100 hover:bg-emerald-700 mt-6"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Authorize Redefinition"}
                    </motion.button>
                    <div className="flex items-center justify-center gap-3 py-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sequence Verified</span>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-12 flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity duration-700 grayscale cursor-default select-none pointer-events-none">
        <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-900">LinkVibe Secure Recovery</span>
      </div>
    </div>
  );
}

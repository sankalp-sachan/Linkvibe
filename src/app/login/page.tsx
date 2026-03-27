"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setTokens } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Wait for redirecting...');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
       <div className="max-w-md w-full bg-slate-50 border border-slate-100 rounded-3xl p-10 shadow-sm">
            <div className="flex flex-col items-center mb-10">
                <div className="bg-indigo-600 p-3 rounded-2xl mb-4 shadow-lg">
                    <ExternalLink className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900">Welcome back</h1>
                <p className="text-gray-500 font-medium">Log in to manage your LinkVibe</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
                    <Input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-200"
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <Input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-200 pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Authenticating..." : "Login"}
                </button>
            </form>

            <div className="mt-8 text-center text-gray-500 font-semibold">
                Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline">Sign up for free</Link>
            </div>
       </div>
    </div>
  );
}

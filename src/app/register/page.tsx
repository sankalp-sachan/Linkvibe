"use client";

import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { ExternalLink, Sparkles, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser, setTokens } = useAuthStore();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { username: username.toLowerCase(), email: email.toLowerCase(), password });
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
       <div className="max-w-md w-full bg-slate-50 border border-slate-100 rounded-3xl p-10 shadow-sm">
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="bg-indigo-600 p-3 rounded-2xl mb-4 shadow-lg flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-black tracking-tight text-gray-900 leading-tight">Join LinkVibe</h1>
                <p className="text-gray-500 font-medium">Claim your username and start sharing!</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Claim your URL</label>
                    <div className="flex">
                        <div className="bg-gray-100 border border-r-0 border-gray-200 px-4 py-3 rounded-l-xl text-gray-400 font-bold select-none whitespace-nowrap overflow-hidden max-w-[120px] text-ellipsis sm:max-w-none">
                            linkvibe.../
                        </div>
                        <div className="relative flex-1">
                            <Input 
                                type="text" 
                                name="username"
                                value={username} 
                                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))} 
                                required 
                                className="rounded-r-xl rounded-l-none border-gray-200 focus:border-indigo-500 font-bold placeholder:font-medium placeholder:text-gray-300 w-full"
                                placeholder="username"
                            />
                        </div>
                    </div>
                   <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Lowercase letters, numbers, and underscores only</p>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email address</label>
                    <Input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="rounded-xl border-gray-200"
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
                            minLength={6}
                            className="rounded-xl border-gray-200 pr-12"
                            placeholder="Min. 6 characters"
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
                    className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95 disabled:opacity-50 mt-4"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>

            <div className="mt-8 text-center text-gray-500 font-semibold">
                Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Log in</Link>
            </div>
       </div>
    </div>
  );
}

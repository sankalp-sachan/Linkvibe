import React, { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { Camera, Save, User as UserIcon, Loader2, UserCircle2, Type, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

import { getPublicAssetUrl } from '@/lib/axios';

export const ProfileSettings = () => {
  const { user, setUser } = useAuthStore();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.put('/user/update', { displayName, bio });
      setUser(data);
      toast.success('Your profile has been updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size too large (max 10MB)');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    try {
      const { data } = await api.post('/user/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(data.user);
      toast.success('Avatar looking sharp!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 md:py-6">
      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 premium-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="flex items-center gap-4 mb-10">
           <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <UserCircle2 className="w-7 h-7" />
           </div>
           <div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight">Identity Hub</h2>
              <p className="text-sm font-semibold text-slate-400">Manage your public presence</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Avatar Section */}
            <div className="lg:col-span-4 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-slate-100 pb-10 lg:pb-0 lg:pr-10">
              <div className="relative group">
                <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="w-40 h-40 rounded-[2.5rem] overflow-hidden bg-slate-100 flex items-center justify-center border-4 border-white shadow-xl relative ring-1 ring-slate-100"
                >
                  {user?.avatar ? (
                    <img src={getPublicAssetUrl(user.avatar) || ''} alt={user.username} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                  ) : (
                    <div className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 w-full h-full flex items-center justify-center">
                       <span className="text-4xl font-black text-brand-primary">{user?.username.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                       <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                    </div>
                  )}
                </motion.div>
                
                <label className="absolute -bottom-3 -right-3 bg-slate-900 p-3.5 rounded-2xl cursor-pointer shadow-2xl hover:bg-brand-primary transition-all text-white border-4 border-white group-hover:scale-110 group-active:scale-90">
                  <Camera className="w-5 h-5" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="mt-8 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">Tap icon to refresh your look</p>
            </div>

            {/* Form Section */}
            <form onSubmit={handleUpdateProfile} className="lg:col-span-8 space-y-8">
              <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      <Type className="w-3.5 h-3.5" />
                      Public Alias
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="glass-input w-full h-14 rounded-2xl px-6 text-slate-900 font-bold placeholder:text-slate-300 outline-none"
                      placeholder="e.g. Satoshi Nakamoto"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest ml-1">
                      <Quote className="w-3.5 h-3.5" />
                      About You
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="glass-input w-full p-6 h-40 rounded-3xl text-slate-900 font-medium placeholder:text-slate-300 outline-none resize-none"
                      placeholder="Write something extraordinary about yourself..."
                      maxLength={160}
                    />
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] font-bold text-slate-300">MAX 160 CHARACTERS</span>
                        <span className={`text-xs font-black ${bio.length > 150 ? 'text-brand-accent' : 'text-slate-400'}`}>{bio.length}/160</span>
                    </div>
                  </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-premium py-4 flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary/90 text-lg"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Commit Changes
                  </>
                )}
              </motion.button>
            </form>
        </div>
      </div>
    </div>
  );
};

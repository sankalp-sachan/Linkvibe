"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, Share2, Globe, Link as LinkIcon, User } from 'lucide-react';

export default function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = React.use(params);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api'}/p/${username}`);
        setProfile(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Profile not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
    </div>
  );

  if (error || !profile) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">404 - Profile Not Found</h1>
        <p className="text-gray-500 text-center">The profile you are looking for does not exist or has been removed.</p>
    </div>
  );

  const { user, links } = profile;
  
  // Custom Themes Support (Simple mapping)
  const themes: any = {
      default: "bg-white text-gray-900",
      dark: "bg-slate-900 text-white",
      vibrant: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white",
      minimal: "bg-gray-50 text-gray-800",
  };

  const currentThemeClass = themes[user.theme] || themes.default;

  return (
    <div className={`min-h-screen ${currentThemeClass} py-16 px-4`}>
       <div className="max-w-xl mx-auto flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 bg-gray-200">
                {user.avatar ? (
                    <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold text-2xl uppercase">
                        {user.username.charAt(0)}
                    </div>
                )}
            </div>

            {/* Profile Info */}
            <h1 className="text-2xl font-bold mb-2">@{user.username}</h1>
            {user.bio && <p className="text-center opacity-90 max-w-md mb-8">{user.bio}</p>}

            {/* Social Icons */}
            <div className="flex gap-4 mb-10">
                {user.socialLinks?.instagram && (
                    <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Share2 className="w-6 h-6" /></a>
                )}
                {user.socialLinks?.twitter && (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><Globe className="w-6 h-6" /></a>
                )}
                {user.socialLinks?.github && (
                    <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform"><LinkIcon className="w-6 h-6" /></a>
                )}
            </div>

            {/* Links List */}
            <div className="w-full space-y-4">
                {links.map((link: any) => (
                    <a
                        key={link._id}
                        href={`${process.env.NEXT_PUBLIC_API_URL || 'https://linkvibe-backend.onrender.com/api'}/p/r/${link._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                            block w-full py-4 px-6 text-center font-bold text-lg 
                            rounded-xl shadow-sm hover:scale-[1.02] transition-all
                            ${user.theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white text-gray-900 border border-gray-100'}
                             hover:shadow-md
                        `}
                    >
                        {link.title}
                    </a>
                ))}
            </div>

            <div className="mt-20">
                <a 
                    href="/register" 
                    className={`
                        flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm shadow-lg transition-all
                        ${user.theme === 'dark' 
                            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/20'}
                    `}
                >
                    <ExternalLink className="w-4 h-4" />
                    Explore LinkVibe
                </a>
            </div>
       </div>
    </div>
  );
}

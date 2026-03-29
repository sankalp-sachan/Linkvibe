"use client";

import Link from 'next/link';
import { 
  ExternalLink, 
  PieChart, 
  Palette, 
  Zap, 
  CheckCircle, 
  Smartphone, 
  Globe, 
  Rocket, 
  ArrowRight,
  MousePointer2,
  Sparkles,
  ShieldCheck,
  ZapIcon
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function LandingPage() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-100/40 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-purple-100/30 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-pink-100/20 rounded-full blur-[100px] -z-10"></div>

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-slate-50/50">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 group"
             >
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-display font-black text-2xl tracking-tight text-slate-900">LinkVibe</h1>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 md:gap-8"
            >
                <Link href="/login" className="text-slate-600 font-bold hover:text-indigo-600 transition-colors hidden sm:block">Log In</Link>
                <Link href="/register" className="bg-slate-900 text-white px-7 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200 active:scale-95">
                  Get Started Free
                </Link>
            </motion.div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-6 pt-20 pb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="lg:col-span-7 text-center lg:text-left"
                >
                    <motion.div variants={item} className="inline-flex items-center gap-2 bg-indigo-100/60 text-indigo-700 px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 border border-indigo-200/50 backdrop-blur-sm">
                       <Sparkles className="w-4 h-4" />
                       Experience the Future of Bio-Links
                    </motion.div>
                    
                    <motion.h2 variants={item} className="text-6xl md:text-8xl lg:text-[100px] font-display font-black text-slate-950 leading-[0.9] tracking-tightest mb-8 decoration-indigo-600/10">
                        Everything <br /> You Are in <br />
                        <span className="text-gradient">One Link.</span>
                    </motion.h2>
                    
                    <motion.p variants={item} className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed mx-auto lg:mx-0">
                        LinkVibe empowers creators to build a stunning digital home in seconds. Share your work, grow your audience, and track every click.
                    </motion.p>
                    
                    <motion.div variants={item} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                        <Link href="/register" className="group relative bg-indigo-600 text-white px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 overflow-hidden flex items-center justify-center gap-3">
                            Claim Your Vibe
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold text-slate-400">Trusted by 10k+ creators</p>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring" }}
                  className="lg:col-span-5 relative flex justify-center lg:justify-end"
                >
                    {/* Floating Premium Phone Mockup */}
                    <div className="w-[320px] h-[640px] bg-slate-950 rounded-[3.5rem] p-3 border-[12px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative animate-float group">
                        <div className="w-24 h-6 bg-slate-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl z-20"></div>
                        
                        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                             {/* Profile Preview Content */}
                             <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 pt-20 px-6 text-center">
                                <motion.div 
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 1 }}
                                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-4 border border-white/30"
                                ></motion.div>
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1.2 }}
                                  className="h-4 w-32 bg-white/30 rounded-full mx-auto mb-2"
                                ></motion.div>
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1.4 }}
                                  className="h-3 w-24 bg-white/20 rounded-full mx-auto mb-10"
                                ></motion.div>
                                
                                <div className="space-y-4">
                                     {[1, 2, 3, 4].map(i => (
                                         <motion.div 
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 1.5 + (i * 0.1) }}
                                            className="w-full h-14 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20"
                                         ></motion.div>
                                     ))}
                                </div>
                             </div>
                        </div>

                        {/* Floating Notifications UI */}
                        <div className="absolute -left-12 top-1/4 glass-card p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
                           <div className="bg-emerald-500 p-2 rounded-xl">
                              <PieChart className="w-5 h-5 text-white" />
                           </div>
                           <div className="pr-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                              <p className="font-display font-black text-slate-900">+24%</p>
                           </div>
                        </div>

                        <div className="absolute -right-8 bottom-1/4 glass-card p-4 rounded-2xl shadow-2xl flex items-center gap-3">
                           <div className="bg-amber-500 p-2 rounded-xl">
                              <ZapIcon className="w-5 h-5 text-white" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time</p>
                              <p className="font-display font-black text-slate-900">Active</p>
                           </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </header>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="text-center mb-24">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 italic">The Ecosystem</h3>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-slate-950">Designed for <br className="md:hidden" /> Performance.</h2>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                    {/* Big Card */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="md:col-span-8 bento-card flex flex-col justify-between overflow-hidden relative group"
                    >
                         <div className="max-w-md relative z-10">
                            <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-100">
                                <Palette className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="text-3xl font-display font-black mb-4">Unmatched Style Engine</h4>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                Go beyond basic buttons. Our editor lets you craft bespoke interfaces with custom glassmorphism, depth-aware shadows, and futuristic gradients.
                            </p>
                         </div>
                         <div className="absolute right-[-10%] bottom-[-10%] w-1/2 h-1/2 opacity-10 group-hover:scale-125 transition-transform duration-700">
                            <Palette className="w-full h-full text-indigo-600" />
                         </div>
                    </motion.div>

                    {/* Small Card */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="md:col-span-4 bento-card bg-slate-950 text-white border-none"
                    >
                         <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                             <ShieldCheck className="w-7 h-7 text-indigo-400" />
                         </div>
                         <h4 className="text-3xl font-display font-black mb-4">Enterprise Security</h4>
                         <p className="text-slate-400 text-lg font-medium leading-relaxed">Your data is yours. We use bank-grade encryption and privacy-first tracking.</p>
                    </motion.div>

                    {/* Med Card */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="md:col-span-4 bento-card"
                    >
                         <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-emerald-100">
                             <PieChart className="w-7 h-7 text-white" />
                         </div>
                         <h4 className="text-3xl font-display font-black mb-4">Live Insights</h4>
                         <p className="text-slate-500 text-lg font-medium">Understand where your traffic flows with beautiful, real-time heatmaps.</p>
                    </motion.div>

                    {/* Med Card */}
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="md:col-span-8 bento-card bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-none"
                    >
                         <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <div className="bg-white/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
                                    <Smartphone className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-3xl font-display font-black mb-4">Mobile-Perfect UI</h4>
                                <p className="text-indigo-100 text-lg font-medium leading-relaxed">
                                    Optimized for the next generation of mobile devices. Zero lag, lightning-fast loads.
                                </p>
                            </div>
                            <div className="hidden lg:block w-48 h-48 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Rocket className="w-20 h-20 text-white/50" />
                            </div>
                         </div>
                    </motion.div>
                 </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-slate-50">
           <div className="max-w-5xl mx-auto px-6">
              <div className="glass-card rounded-[4rem] p-12 md:p-24 text-center border-none bg-slate-900 overflow-hidden relative group">
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -z-10 group-hover:scale-150 transition-transform duration-1000"></div>
                 <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8">
                    Your Digital Future <br /> Starts Today.
                 </h2>
                 <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto mb-12">
                    Join thousands of creators who are already vibrating on a different frequency.
                 </p>
                 <Link href="/register" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                    Get Your Link Free
                    <MousePointer2 className="w-6 h-6" />
                 </Link>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-slate-900 py-32 px-6 border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-slate-950 p-2 rounded-xl">
                                <Rocket className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="font-display font-black text-3xl tracking-tight">LinkVibe</h1>
                        </div>
                        <p className="text-slate-500 font-medium text-lg max-w-sm mb-10">
                            Building the infrastructure for the next generation of digital creators and curators.
                        </p>
                        <div className="flex gap-4">
                            {[Globe, PieChart, ExternalLink].map((Icon, i) => (
                                <div key={i} className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all cursor-pointer">
                                    <Icon className="w-5 h-5" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Product</h5>
                        <ul className="space-y-4 text-slate-600 font-bold">
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Features</li>
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Templates</li>
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Analytics</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-8">Company</h5>
                        <ul className="space-y-4 text-slate-600 font-bold">
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">About</li>
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy</li>
                            <li className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100 gap-8">
                    <p className="text-slate-400 font-bold text-sm tracking-tight text-center sm:text-left">© 2026 LinkVibe. Elevated by ❤️ for Creators.</p>
                    <div className="flex gap-8 text-sm font-black uppercase tracking-widest text-slate-400">
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Sitemap</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">Legal</span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  );
}

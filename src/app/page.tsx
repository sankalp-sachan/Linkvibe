import Link from 'next/link';
import { ExternalLink, PieChart, Palette, Zap, CheckCircle, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-0 -translate-x-1/4 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl -z-10"></div>

        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-transparent">
             <div className="flex items-center gap-3">
                <div className="bg-indigo-600 p-2 rounded-xl">
                    <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <h1 className="font-black text-2xl tracking-tighter text-gray-900">LinkVibe</h1>
            </div>
            <div className="flex items-center gap-6">
                <Link href="/login" className="text-gray-600 font-bold hover:text-indigo-600 transition-colors">Log In</Link>
                <Link href="/register" className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-gray-200">Get Started</Link>
            </div>
        </nav>

        {/* Hero Section */}
        <header className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center md:text-left md:flex items-center gap-12">
            <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-indigo-100">
                   <Zap className="w-4 h-4" />
                   New: Advanced Theme Editor
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-gray-950 leading-[0.95] tracking-tighter mb-8">
                    One Link <br />
                    <span className="text-indigo-600">Everything</span>
                </h2>
                <p className="text-xl text-gray-500 font-medium max-w-lg mb-10 leading-relaxed capitalize">
                    Connect your tiktok, instagram, youtube, and everything else in one stylish page. Track clicks and maximize reach.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Link href="/register" className="bg-indigo-600 text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95">Claim Your Name</Link>
                    <Link href="#features" className="bg-white text-gray-900 border border-gray-200 px-8 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all active:scale-95 shadow-lg shadow-gray-200/50">Learn More</Link>
                </div>
            </div>
            <div className="flex-1 mt-16 md:mt-0 relative flex justify-center">
                 <div className="w-72 h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden group">
                     {/* Mock Browser Preview UI */}
                     <div className="absolute inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center pt-10 px-6">
                        <div className="w-16 h-16 bg-white/20 rounded-full mb-4 animate-pulse"></div>
                        <div className="w-3/4 h-4 bg-white/30 rounded-full mb-2"></div>
                        <div className="w-1/2 h-4 bg-white/30 rounded-full mb-8"></div>
                        <div className="w-full space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-full h-12 bg-white/20 rounded-xl"></div>
                            ))}
                        </div>
                     </div>
                 </div>
                 {/* Floating widgets */}
                 <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-2xl border border-indigo-50 flex items-center gap-3 animate-bounce">
                    <PieChart className="w-6 h-6 text-indigo-600" />
                    <p className="font-black text-sm text-gray-900">+12% Click-thru</p>
                 </div>
            </div>
        </header>

        {/* Value Props */}
        <section id="features" className="bg-white py-32">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2">
                         <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100">
                             <Palette className="w-6 h-6 text-white" />
                         </div>
                         <h3 className="text-2xl font-black mb-4">Unlimited Styles</h3>
                         <p className="text-gray-500 font-medium leading-relaxed">Customize your profile with stunning themes, custom colors, and unique fonts.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2">
                         <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-100">
                             <PieChart className="w-6 h-6 text-white" />
                         </div>
                         <h3 className="text-2xl font-black mb-4">Advanced Analytics</h3>
                         <p className="text-gray-500 font-medium leading-relaxed">Real-time data on how your audience interacts with your links and content.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2">
                         <div className="bg-amber-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-amber-100">
                             <Smartphone className="w-6 h-6 text-white" />
                         </div>
                         <h3 className="text-2xl font-black mb-4">Mobile Optimized</h3>
                         <p className="text-gray-500 font-medium leading-relaxed">Built for the mobile-first generation. Smooth, fast, and light on every device.</p>
                    </div>
                 </div>
            </div>
        </section>

        <footer className="bg-slate-950 text-white py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-3">
                    <ExternalLink className="w-8 h-8 text-indigo-400" />
                    <h1 className="font-extrabold text-3xl tracking-tighter">LinkVibe</h1>
                </div>
                {/* <div className="flex gap-10 text-gray-400 font-bold">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div> */}
                <p className="text-gray-600 font-medium uppercase tracking-widest text-xs">© 2026 SaaS Inc. All rights reserved.</p>
            </div>
        </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, Bell, Search, User, Briefcase, BarChart3, Heart, Sun, Moon, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useTheme } from '../context/ThemeContext';

export function Sidebar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Rocket },
    { name: 'Explorer', path: '/explorer', icon: Search },
    { name: 'AI Match', path: '/ai-match', icon: Target },
    { name: 'Dashboard', path: '/recruiter', icon: Briefcase },
    { name: 'Pricing', path: '/pricing', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900 flex flex-col flex-shrink-0 min-h-screen fixed left-0 top-0 hidden lg:flex">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Rocket className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-white font-display font-bold text-lg leading-tight tracking-tight">HireSphere</h1>
            <span className="text-indigo-400 text-[10px] uppercase tracking-widest font-black">AI Intelligence</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div
              key={link.path}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to={link.path} 
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon size={18} className={cn(isActive ? "text-white" : "group-hover:text-white")} />
                <span className="font-bold text-sm tracking-tight">{link.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-indigo-600 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 mb-6 mx-4 bg-slate-800/50 rounded-2xl border border-white/5">
        <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-3">Hiring Credits</p>
        <div className="w-full bg-slate-700 h-1.5 rounded-full mb-4 overflow-hidden">
          <div className="bg-indigo-500 h-1.5 rounded-full w-3/4"></div>
        </div>
        <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md">
          Upgrade Pro
        </button>
      </div>
    </aside>
  );
}

export function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 fixed top-0 right-0 left-0 lg:left-64 z-30 transition-all">
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search candidates, skills, or job roles..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 transition-all"
        />
      </div>
      
      <div className="flex-1 md:hidden">
        <Link to="/" className="flex items-center gap-2">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white"><Rocket size={18} /></div>
           <span className="font-display font-black text-sm dark:text-white">HireSphere AI</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-100 dark:border-cyan-800">
          <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full"></span>
          AI Sync: Active
        </div>
        
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800 dark:text-white">Siddharth V.</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Senior Recruiter</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 border-2 border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold group-hover:scale-110 transition-transform">
             SV
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Rocket size={18} />
            </div>
            <span className="text-xl font-display font-bold">HireSphere AI</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Revolutionizing talent discovery with intelligence. Connect with top remote and onsite professionals globally.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><Link to="/explorer">Browse Talent</Link></li>
            <li><Link to="/jobs">Job Marketplace</Link></li>
            <li><Link to="/ai">AI Matcher</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Guides</a></li>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
        © 2026 HireSphere AI. All rights reserved. Built with love for the future of work.
      </div>
    </footer>
  );
}

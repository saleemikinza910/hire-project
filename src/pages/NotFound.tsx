import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Rocket, Home } from 'lucide-react';
import { Button } from '../components/ui/Shared';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Rocket size={48} className="rotate-45" />
        </div>
        <h1 className="text-8xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-slate-200 mb-6">Lost in Space?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-md mx-auto text-lg">
          The talent you are looking for is in another galaxy. Let's get you back to the home base.
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none">
            <Home size={20} className="mr-2" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

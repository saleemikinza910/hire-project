import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, TopBar } from '../components/Navigation';
import { motion, AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 font-sans transition-colors duration-300">
      <ScrollToTop />
      <Sidebar />
      
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <TopBar />
        
        <main className="flex-1 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 30,
                mass: 1
              }}
              className="p-8 h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

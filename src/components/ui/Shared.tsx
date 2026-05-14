import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

interface CardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass, ...props }: CardProps) {
  const defaultHover = !props.whileHover ? { 
    y: -5,
    rotateX: 2,
    rotateY: -2,
    transition: { duration: 0.2 }
  } : undefined;

  return (
    <motion.div
      whileHover={defaultHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "rounded-2xl border transition-all duration-300",
        glass ? "glass" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/20 dark:hover:border-indigo-500/30",
        className
      )}
      style={{ perspective: 1000 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, className, variant = 'default', ...props }: React.ComponentPropsWithoutRef<'span'> & { 
  variant?: 'default' | 'premium' | 'accent' | 'outline'
}) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    premium: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800',
    accent: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-800',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg';
}) {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm border border-indigo-500/10',
    secondary: 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm',
    outline: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700',
    ghost: 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100',
    premium: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo shadow-lg'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-bold',
    md: 'px-4 py-2.5 text-xs font-bold uppercase tracking-wider',
    lg: 'px-6 py-3.5 text-sm font-bold uppercase tracking-widest'
  };

  return (
    <button
      className={cn(
        "rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-medium flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

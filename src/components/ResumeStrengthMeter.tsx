import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from './ui/Shared';
import { cn } from '../lib/utils';

interface ResumeStrengthMeterProps {
  score: number;
  breakdown: {
    label: string;
    complete: boolean;
  }[];
}

export const ResumeStrengthMeter: React.FC<ResumeStrengthMeterProps> = ({ score, breakdown }) => {
  return (
    <Card className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-display font-black text-slate-900 dark:text-white leading-tight">Resume Strength</h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">Quality & Completeness</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-display font-black text-indigo-600 dark:text-indigo-400">{score}%</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
          />
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {breakdown.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                item.complete ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              )}>
                {item.complete ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
              </div>
              <span className={cn(
                "text-xs font-bold",
                item.complete ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-600"
              )}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
            Tip: Complete your "System Design" case study to reach 95% strength.
          </p>
        </div>
      </div>
    </Card>
  );
};

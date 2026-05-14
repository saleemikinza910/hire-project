import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, BrainCircuit, ScanSearch, CheckCircle2 } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/Shared';
import { motion, AnimatePresence } from 'motion/react';
import { talentService } from '../services/api';
import { Talent } from '../types';
import { Link } from 'react-router-dom';

export default function AIMatch() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Talent[]>([]);

  const handleAnalyze = async () => {
    if (!jobDescription) return;
    setIsAnalyzing(true);
    setResults([]);
    
    // Simulate AI processing
    setTimeout(async () => {
      const data = await talentService.getTalents();
      setResults(data.slice(0, 3).sort((a, b) => b.matchScore - a.matchScore));
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="text-center mb-16">
        <motion.div 
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <BrainCircuit size={32} />
        </motion.div>
        <h1 className="text-4xl font-display font-black mb-4 text-slate-900 dark:text-white leading-tight">AI Match <span className="text-gradient">Intelligence</span></h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Paste your job description and our neural matching engine will extract ideal candidates.</p>
      </div>

      <Card className="p-8 mb-10 shadow-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative overflow-hidden" whileHover={{ scale: 1.01 }}>
        {isAnalyzing && (
          <motion.div 
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent z-10 shadow-[0_0_15px_rgba(79,70,229,0.8)]"
          />
        )}
        <textarea
          className="w-full h-40 p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all text-sm font-bold resize-none mb-6 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none dark:text-white"
          placeholder="e.g. Seeking a Senior React lead with 5+ years experience in distributed systems and AWS..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Button 
          onClick={handleAnalyze} 
          disabled={!jobDescription || isAnalyzing}
          variant="premium" 
          size="lg" 
          className="w-full"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-3">
               <ScanSearch className="animate-spin" /> Neural Sync Active...
            </span>
          ) : (
            <span className="flex items-center gap-3">
               Generate Intelligence Report <ArrowRight />
            </span>
          )}
        </Button>
      </Card>

      <AnimatePresence>
        {isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-6 flex items-center gap-4 relative overflow-hidden">
                 <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                 <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4 animate-pulse" />
                 </div>
                 <motion.div 
                   animate={{ x: ["-100%", "200%"] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent skew-x-12"
                 />
              </div>
            ))}
          </motion.div>
        )}

        {!isAnalyzing && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-8 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <CheckCircle2 size={18} /> Found 3 high-probability matches based on requirements
            </div>
            
            {results.map((talent, idx) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <Link to={`/talent/${talent.id}`}>
                  <Card className="p-6 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all cursor-pointer group" whileHover={{ scale: 1.01 }}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <img src={talent.avatar} className="w-20 h-20 rounded-xl" alt={talent.name} />
                      <div className="flex-grow text-center md:text-left">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                          <Badge variant="premium">98% Match</Badge>
                          <Badge variant="outline">{talent.experience} Experience</Badge>
                        </div>
                        <h3 className="text-xl font-display font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                          {talent.name}
                        </h3>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{talent.role}</p>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button size="sm" className="w-full">Direct Hire</Button>
                        <Button variant="ghost" size="sm" className="w-full">View Data</Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

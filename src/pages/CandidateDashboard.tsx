import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  User, FileText, CheckCircle2, Clock, 
  Settings, Bell, Edit3, Share2, 
  ExternalLink, Github, Linkedin, Briefcase, Zap
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui/Shared';
import { cn } from '../lib/utils';
import { ResumeStrengthMeter } from '../components/ResumeStrengthMeter';

export default function CandidateDashboard() {
  const user = {
    name: 'Alex Rivera',
    role: 'Senior Full Stack Developer',
    strength: 88,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    location: 'San Francisco, CA',
  };

  const resumeBreakdown = [
    { label: 'Work Experience', complete: true },
    { label: 'Technical Skills', complete: true },
    { label: 'Education History', complete: true },
    { label: 'Case Studies', complete: false },
    { label: 'GitHub Sync', complete: true },
    { label: 'Certifications', complete: false },
  ];

  return (
    <div className="pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Profile Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="p-8 text-center" whileHover={{ rotateY: 5, rotateX: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="relative inline-block mb-6">
              <img src={user.avatar} className="w-28 h-28 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg mx-auto" alt={user.name} />
              <button className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2 rounded-lg shadow-xl hover:bg-slate-800 dark:hover:bg-white transition-all">
                <Edit3 size={14} />
              </button>
            </div>
            <h2 className="text-xl font-display font-black text-slate-900 dark:text-white leading-tight">{user.name}</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">{user.role}</p>
            
            <div className="space-y-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-[9px]">Profile Intensity</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs">{user.strength}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" style={{width: `${user.strength}%`}} />
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm"><Github size={16} /></button>
              <button className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm"><Linkedin size={16} /></button>
              <button className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all shadow-sm"><Share2 size={16} /></button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 px-2">Manage Account</h3>
            <nav className="space-y-1">
              {[
                { name: 'My Intelligence', icon: User, active: true },
                { name: 'Portfolio Sync', icon: FileText },
                { name: 'Applications', icon: Briefcase },
                { name: 'Inbox', icon: Bell },
                { name: 'Settings', icon: Settings },
              ].map((item) => (
                <button
                  key={item.name}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all group",
                    item.active ? "bg-indigo-600/10 text-indigo-600" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <item.icon size={16} className={cn(item.active ? "text-indigo-600" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300")} />
                  {item.name}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Main Content Area */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="xl:col-span-3 space-y-8"
        >
          {/* Welcome Banner */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="p-10 relative overflow-hidden bg-slate-900 dark:bg-slate-900/50 text-white border-none shadow-indigo">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 max-w-xl">
                 <span className="text-indigo-400 text-[10px] uppercase font-black tracking-widest block mb-4">Elite Status Verified</span>
                 <h3 className="text-3xl font-display font-black mb-4 leading-tight">Your profile is in the top 12% of <span className="text-indigo-400">global experts.</span></h3>
                 <p className="text-slate-400 mb-8 font-medium leading-relaxed">Companies like Google, Meta, and OpenAI are looking for exactly your skill set. Keep your portfolio synced for best results.</p>
                 <Button variant="premium" size="md">Sync Portfolio Now</Button>
               </div>
            </Card>
          </motion.div>

          {/* Resume Strength Meter */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <ResumeStrengthMeter score={75} breakdown={resumeBreakdown} />
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Recent Activity */}
            <Card className="p-8 pb-4">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Application Pipeline</h3>
                <Link to="#" className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-2 py-1 rounded transition-colors">View History</Link>
              </div>
              <div className="space-y-6">
                {[
                  { company: 'Google', role: 'Staff Engineer', status: 'In Review', date: '2 days ago', logo: 'G' },
                  { company: 'Meta', role: 'Full Stack', status: 'Interview', date: '5 days ago', logo: 'M' },
                  { company: 'OpenAI', role: 'AI Engineer', status: 'Applied', date: '1 week ago', logo: 'O' },
                ].map((job, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer border-b border-slate-50 dark:border-slate-800 pb-6 last:border-0 border-solid">
                    <div className="w-11 h-11 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center font-black text-slate-400 dark:text-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:border-slate-900 dark:group-hover:border-white group-hover:text-white dark:group-hover:text-slate-900 transition-all shadow-sm">
                      {job.logo}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.company}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">{job.role}</p>
                    </div>
                    <div className="text-right">
                       <Badge variant={job.status === 'Interview' ? 'premium' : 'default'} className="px-2">
                        {job.status}
                       </Badge>
                       <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-tighter">{job.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>


            {/* Profile Views Chart Mock */}
            <Card className="p-8">
               <h3 className="text-xl font-display font-bold mb-6 dark:text-white">Profile Views</h3>
               <div className="h-40 flex items-end gap-2 mb-6">
                 {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     className="flex-grow bg-indigo-100 dark:bg-indigo-900/40 rounded-t-lg hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors cursor-pointer group relative"
                   >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                       {Math.floor(Math.random() * 100)}
                     </div>
                   </motion.div>
                 ))}
               </div>
               <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                 <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">12 Profile matches today</span>
                 </div>
                 <Button variant="ghost" size="sm" className="text-xs">Analytics</Button>
               </div>
            </Card>
          </motion.div>

          {/* Skill Analytics */}
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <Card className="p-8">
              <h3 className="text-xl font-display font-bold mb-8 dark:text-white">Intelligence Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { skill: 'React Architecture', score: 95, color: 'indigo' },
                { skill: 'System Design', score: 82, color: 'purple' },
                { skill: 'Cloud Operations', score: 78, color: 'cyan' },
              ].map((s) => (
                <div key={s.skill} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{s.skill}</span>
                    <span className={`text-${s.color}-600 dark:text-${s.color}-400 font-black`}>{s.score}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn("h-full", `bg-${s.color}-600`)} style={{width: `${s.score}%`}} />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">Advanced industry proficiency verified by AI assessment.</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  </div>
);
}

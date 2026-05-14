import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Globe, Mail, Phone, Calendar, Star, 
  Github, Linkedin, Twitter, ExternalLink, 
  CheckCircle2, Award, Zap, Code2, Users, ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import { talentService } from '../services/api';
import { Talent, Project } from '../types';
import { Card, Badge, Button } from '../components/ui/Shared';
import { cn } from '../lib/utils';

export default function CandidateDetails() {
  const { id } = useParams<{ id: string }>();
  const [talent, setTalent] = useState<Talent | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInvited, setIsInvited] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = await talentService.getTalentById(Number(id));
        const p = await talentService.getProjectsByUserId(Number(id));
        setTalent(t);
        setProjects(p);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleInvite = () => {
    setIsInvited(true);
    // Simulate real action
    setTimeout(() => {
      // Could reset or show toast
    }, 3000);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-12">
      <div className="h-96 bg-slate-100 animate-pulse rounded-3xl" />
    </div>
  );

  if (!talent) return <div className="text-center p-20">Talent not found.</div>;

  return (
    <div className="pb-20">
      {/* Hero Banner Section */}
      <section className="relative">
        <div className="mb-6">
          <Link to="/explorer" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Explorer
          </Link>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/5">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative shrink-0"
              whileHover={{ rotateY: 10 }}
            >
              <img 
                src={talent.avatar} 
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-4 border-white/10 shadow-2xl" 
                alt={talent.name} 
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-lg shadow-lg border-2 border-slate-900">
                <CheckCircle2 size={20} />
              </div>
            </motion.div>

            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <Badge variant="accent">Available: {talent.availability}</Badge>
                <Badge variant="premium">Elite Member</Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black text-white mb-2 tracking-tight">{talent.name}</h1>
              <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8">{talent.role} • {talent.experience} Exp</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5"><MapPin size={14} className="text-indigo-500" /> {talent.address.city}</div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5"><Globe size={14} className="text-indigo-500" /> {talent.website}</div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5"><Mail size={14} className="text-indigo-500" /> {talent.email}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
              <Button 
                size="md" 
                className={cn(
                  "w-full shadow-indigo transition-all duration-500",
                  isInvited ? "bg-green-600 border-green-500 hover:bg-green-700" : ""
                )}
                onClick={handleInvite}
                disabled={isInvited}
              >
                {isInvited ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={18} /> Invitation Sent
                  </span>
                ) : (
                  "Invite to Interview"
                )}
              </Button>
              <Button size="md" variant="outline" className="w-full border-white/10 text-white bg-white/5 hover:bg-white/10">
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Info */}
      <section className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Skills */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">AI Assessment Report</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">Role Alignment</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-xs">{talent.matchScore}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${talent.matchScore}%` }}
                      className="h-full bg-indigo-600"
                    />
                  </div>
                  <p className="mt-4 text-[10px] font-medium text-slate-400 leading-relaxed italic">Algorithm recommends this candidate for high-velocity engineering environments based on repository history.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-center">
                    <div className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{talent.projectsCount}</div>
                    <div className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Projects</div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl text-center">
                    <div className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{talent.rating}</div>
                    <div className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Rating</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">Verified Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {talent.skills.map(skill => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="flex justify-between gap-4">
              <button className="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all shadow-sm">
                <Github size={18} />
              </button>
              <button className="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all shadow-sm">
                <Linkedin size={18} />
              </button>
              <button className="flex-1 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all shadow-sm">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: About & Projects */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-display font-black mb-6 text-slate-900 dark:text-white">Intelligence Brief</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-loose text-sm font-medium">
                {talent.company.catchPhrase}. Dedicated to building {talent.company.bs} using high-performance technological paradigms. Expert-level focus on {talent.role.toLowerCase()} with emphasis on architectural scalability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Card className="p-6 border-l-4 border-indigo-600 bg-white dark:bg-slate-900">
                  <Award size={24} className="text-indigo-600 mb-4" />
                  <h4 className="text-xs font-black uppercase tracking-widest mb-2 leading-none dark:text-white">Code Integrity</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Delivers documentation and test coverage exceeding standard enterprise requirements.</p>
                </Card>
                <Card className="p-6 border-l-4 border-slate-900 dark:border-white bg-white dark:bg-slate-900">
                  <Zap size={24} className="text-slate-900 dark:text-slate-100 mb-4" />
                  <h4 className="text-xs font-black uppercase tracking-widest mb-2 leading-none dark:text-white">Velocity Score</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Top 5% speed in full-cycle deployment and complex feature shipping.</p>
                </Card>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-black text-slate-900 dark:text-white">Portfolio Data</h2>
                <Badge variant="outline" className="px-3">Verified Projects</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="group overflow-hidden border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 h-full flex flex-col" whileHover={{ y: -5 }}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          alt={project.title} 
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="accent" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-indigo-700 dark:text-indigo-400">{project.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <h4 className="text-sm font-black uppercase tracking-widest mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none dark:text-white">{project.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 flex-grow font-medium leading-relaxed">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
                          {project.techStack.map(tech => (
                            <span key={tech} className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {tech}
                            </span>
                          ))}
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          Case Study <ExternalLink size={12} className="ml-2" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

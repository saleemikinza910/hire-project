import React from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';
import { Rocket, Target, Users, Zap, Shield, Globe, ArrowRight, Star, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui/Shared';

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <Card
    className="p-8 h-full"
  >
    <motion.div 
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6"
    >
      <Icon size={28} />
    </motion.div>
    <h3 className="text-xl font-display font-bold mb-3 dark:text-white">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{desc}</p>
  </Card>
);

const HeroCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
  const glowTemplate = useMotionTemplate`radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(99, 102, 241, 0.15), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Card 
        glass 
        className="p-4 relative overflow-hidden group shadow-indigo cursor-crosshair border-white/20 dark:border-white/10"
        whileHover={{ 
          boxShadow: "0 40px 80px -15px rgba(79, 70, 229, 0.5), 0 0 30px rgba(99, 102, 241, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
            className="rounded-xl shadow-2xl group-hover:scale-[1.03] transition-transform duration-700" 
            alt="Main" 
          />
        </div>

        <div 
          style={{ transform: "translateZ(80px)" }}
          className="absolute top-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/50 dark:border-white/10 hidden md:block z-20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Live Matching</span>
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">98% Match</div>
        </div>
        
        <div 
          style={{ transform: "translateZ(60px)" }}
          className="absolute bottom-8 left-8 bg-slate-900/90 backdrop-blur p-5 rounded-2xl shadow-xl flex items-center gap-4 hidden md:flex z-20"
        >
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Active Recruiter</span>
            <span className="text-white text-sm font-semibold">TechCorp Global</span>
          </div>
          <Users className="text-purple-400" size={24} />
        </div>

        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: glowTemplate }}
        />
      </Card>
    </motion.div>
  );
};

export default function Home() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 50,
      y: (e.clientY / window.innerHeight - 0.5) * 50,
    });
  };

  return (
    <div className="overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        className="relative pb-24 px-4 md:px-8"
      >
        {/* Floating 3D Background Orbs */}
        <motion.div 
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div 
          animate={{ x: -mousePos.x * 0.8, y: -mousePos.y * 0.8 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="premium" className="mb-6">v2.0 is now live 🚀</Badge>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-8 text-slate-900 dark:text-white">
              Smart Talent <br />
              <span className="text-gradient">Intelligence</span> <br />
              Ecosystem.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              HireSphere AI helps teams discover the world's best talent using smart matching, skills-first intelligence, and advanced analytics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/explorer">
                <Button size="lg" className="rounded-2xl">
                  Explore Talent <Target size={20} className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-2xl">
                Post a Job
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-sm text-slate-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" alt="Avatar" />
                ))}
              </div>
              <p><span className="font-bold text-slate-900 dark:text-white">10,000+</span> top engineers & designers joined this week</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            className="relative"
            style={{ perspective: 2000 }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-30"
            >
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-3">
                 <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                   <Target size={18} />
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 leading-none">Neural Fit</p>
                   <p className="text-xs font-black text-slate-900 dark:text-white">99.8% Accurate</p>
                 </div>
              </div>
            </motion.div>

            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200/50 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200/50 dark:bg-purple-500/10 rounded-full blur-3xl -z-10" />
            
            <HeroCard />
          </motion.div>
        </div>
      </motion.section>

      {/* Feature Grid */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="py-24"
      >
        <div className="text-center mb-16">
          <Badge className="mb-4">Why Choose Us</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 dark:text-white">Designed for Modern Hiring</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">We've automated the heavy lifting of recruitment so you can focus on building your business.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "AI Match Score", desc: "Our proprietary algorithm calculates skill compatibility based on real-world portfolio data." },
            { icon: Target, title: "Skill Discovery", desc: "Go beyond keywords. Discover talent based on proven capabilities and project outcomes." },
            { icon: Globe, title: "Global Pipeline", desc: "Access a worldwide network of vetted professionals ready to join your team." },
            { icon: Shield, title: "Verified Portfolios", desc: "We verify projects, github contributions, and past work history so you hire with confidence." },
            { icon: BarChart3, title: "Hiring Analytics", desc: "Track your pipeline performance and hiring velocity with intuitive dashboard insights." },
            { icon: Star, title: "Candidate Experience", desc: "A premium dashboard for candidates to showcase their journey and manage opportunities." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="glass p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 font-display">50k+</div>
              <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Top Candidates</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 font-display">2.5k</div>
              <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Companies</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 font-display">95%</div>
              <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black mb-2 font-display">48h</div>
              <div className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Avg. Hire Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Skill Trend Section */}
      <section className="py-24">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          <div className="xl:md:w-1/2">
            <Badge variant="premium" className="mb-4">Live Trends</Badge>
            <h2 className="text-4xl font-display font-black mb-6 text-slate-900 dark:text-white">AI-Driven <span className="text-gradient">Skill Trends</span></h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed">Stay ahead of the curve. Our ecosystem tracks real-world hiring demand in real-time.</p>
            
            <div className="space-y-4">
              {[
                { name: 'AI Engineering', growth: '+142%', color: 'indigo' },
                { name: 'React Server Components', growth: '+85%', color: 'purple' },
                { name: 'Cloud Native Ark', growth: '+64%', color: 'cyan' },
                { name: 'UI/UX Brand Storytelling', growth: '+42%', color: 'purple' },
              ].map((skill, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full bg-${skill.color}-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]`} />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">{skill.name}</span>
                  </div>
                  <span className={`text-${skill.color}-600 dark:text-${skill.color}-400 font-black text-xs tracking-widest leading-none`}>{skill.growth}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="xl:md:w-1/2 grid grid-cols-2 gap-4">
            <Card className="p-8 bg-indigo-600 text-white flex flex-col justify-between aspect-square shadow-indigo">
               <TrendingUp size={40} />
               <div>
                 <div className="text-5xl font-black mb-1">94%</div>
                 <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest leading-none">Hiring Demand for AI roles</p>
               </div>
            </Card>
            <Card className="p-8 bg-slate-900 text-white flex flex-col justify-between aspect-square">
               <Users size={40} className="text-purple-400" />
               <div>
                 <div className="text-5xl font-black mb-1">3.2k</div>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">New AI Profiles this month</p>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight text-slate-900 dark:text-white">Ready to find your next <span className="text-gradient">star player?</span></h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg">Join thousands of companies using HireSphere AI to scale their teams faster and smarter.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="premium">Create Your Account</Button>
          <Button size="lg" variant="outline">Schedule a Demo</Button>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Check, Zap, Shield, Rocket } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui/Shared';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const PricingCard = ({ title, price, desc, features, premium, idx }: any) => (
  <Card 
    className={cn(
      "p-10 flex flex-col h-full relative overflow-hidden",
      premium ? "border-indigo-600 dark:border-indigo-500 shadow-2xl ring-4 ring-indigo-50 dark:ring-indigo-500/10" : "border-slate-100 dark:border-slate-800"
    )}
    whileHover={{ y: -8 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {premium && (
      <div className="absolute top-0 right-0">
        <div className="bg-indigo-600 text-white text-[10px] font-black uppercase px-12 py-1 rotate-45 translate-x-12 translate-y-4 shadow-lg">
          Popular
        </div>
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-xl font-display font-black mb-2 uppercase tracking-widest dark:text-white">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-display font-black tracking-tight dark:text-white">${price}</span>
        <span className="text-slate-400 font-medium font-sans">/mo</span>
      </div>
      <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>

    <div className="flex-grow space-y-4 mb-8">
      {features.map((f: string) => (
        <div key={f} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
          <Check size={18} className="text-indigo-600 shrink-0" />
          {f}
        </div>
      ))}
    </div>

    <Button variant={premium ? 'primary' : 'outline'} className="w-full rounded-2xl h-14">
      {price === '0' ? 'Start Free' : 'Get Started'}
    </Button>
  </Card>
);

export default function Pricing() {
  return (
    <div className="pb-20">
      <div className="text-center mb-16">
        <Badge variant="premium" className="mb-4">Flexible Plans</Badge>
        <h1 className="text-4xl font-display font-black mb-4 text-slate-900 dark:text-white leading-tight">Simple, Transparent <span className="text-gradient">Pricing.</span></h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-medium">Choose the perfect plan for your recruitment needs, from startups to global enterprises.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PricingCard 
          idx={0}
          title="Starter" 
          price="0" 
          desc="Perfect for individuals and small projects."
          features={['Create 1 Profile', 'Apply to Unlimited Jobs', 'Public Portfolio URL', 'Basic Skill Badges']}
        />
        <PricingCard 
          idx={1}
          premium 
          title="Pro Recruiter" 
          price="99" 
          desc="Best for growing startups and scaling teams."
          features={['10 Active Job Posts', 'Smart AI Candidate Matching', 'Recruiter Dashboard', 'Priority Support', 'Verified Talent Access']}
        />
        <PricingCard 
          idx={2}
          title="Enterprise" 
          price="499" 
          desc="Advanced features for global hiring power."
          features={['Unlimited Job Posts', 'Custom AI Sourcing Agents', 'API Access', 'Dedicated Account Manager', 'Advanced Hiring Analytics']}
        />
      </div>

      <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div>
          <h4 className="text-xl font-display font-black mb-2 text-slate-900 dark:text-white">Need a custom solution?</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">We offer tailored packages for large organizations with unique requirements.</p>
        </div>
        <Button size="md" variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
}

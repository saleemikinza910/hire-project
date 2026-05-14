import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, Briefcase, TrendingUp, Calendar, 
  Search, ArrowUpRight, ArrowDownRight,
  Filter, MoreVertical, CheckCircle, Clock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { Card, Badge, Button } from '../components/ui/Shared';

const data = [
  { name: 'Mon', applications: 45, interviews: 12 },
  { name: 'Tue', applications: 52, interviews: 15 },
  { name: 'Wed', applications: 38, interviews: 10 },
  { name: 'Thu', applications: 65, interviews: 22 },
  { name: 'Fri', applications: 48, interviews: 18 },
  { name: 'Sat', applications: 20, interviews: 5 },
  { name: 'Sun', applications: 15, interviews: 2 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, idx }: any) => (
  <Card 
    className="p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
  >
    <div className="flex justify-between items-start mb-5">
      <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg">
        <Icon size={20} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-black tracking-widest px-2 py-1 rounded",
        trend === 'up' ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
      )}>
        {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {trendValue}%
      </div>
    </div>
    <div className="text-2xl font-black mb-1 text-slate-900 dark:text-white tracking-tight">{value}</div>
    <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{title}</div>
  </Card>
);

import { cn } from '../lib/utils';

export default function RecruiterDashboard() {
  return (
    <div className="pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-display font-black mb-2 text-slate-900 dark:text-white leading-tight">Recruiter Center</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Welcome back, Siddharth! Here's your real-time hiring snapshot.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="md">Report</Button>
          <Button size="md">New Job</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard idx={0} title="Active Jobs" value="12" icon={Briefcase} trend="up" trendValue="8" />
        <StatCard idx={1} title="New Applicants" value="1,280" icon={Users} trend="up" trendValue="15" />
        <StatCard idx={2} title="Interviews" value="48" icon={Calendar} trend="down" trendValue="4" />
        <StatCard idx={3} title="Hiring Velocity" value="14 Days" icon={TrendingUp} trend="up" trendValue="12" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-bold dark:text-white">Hiring Trends</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-bold rounded-xl px-4 py-2 focus:ring-0 dark:text-slate-200">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="applications" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Talent Recommendations */}
        <Card className="p-8">
          <h3 className="text-xl font-display font-bold mb-6 dark:text-white">AI Best Matches</h3>
          <div className="space-y-6">
            {[
              { name: 'Alex Rivera', role: 'Full Stack', score: 98, avatar: 'riv' },
              { name: 'Sarah Chen', role: 'AI Researcher', score: 94, avatar: 'sar' },
              { name: 'Jordan Ash', role: 'UI Architect', score: 92, avatar: 'jor' },
            ].map((match) => (
              <div key={match.name} className="flex gap-4 items-center group cursor-pointer">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.avatar}`} className="w-12 h-12 rounded-xl" alt={match.name} />
                <div className="flex-grow">
                  <h4 className="font-bold text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight dark:text-slate-200">{match.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{match.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-indigo-600 dark:text-indigo-400">{match.score}%</div>
                  <div className="text-[8px] uppercase font-bold text-slate-400 dark:text-slate-500">Match</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs py-3 rounded-xl">View All Matches</Button>
          </div>
        </Card>
      </div>

      {/* Hiring Pipeline Table */}
      <Card className="p-8 pb-0 overflow-hidden">
        <div className="flex justify-between items-center mb-8 px-2">
          <h3 className="text-xl font-display font-bold dark:text-white">Hiring Pipeline</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search pipeline..." className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 dark:text-white" />
            </div>
            <Button variant="outline" size="sm" className="rounded-xl"><Filter size={16} /></Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">
                <th className="px-4 py-4">Candidate</th>
                <th className="px-4 py-4">Position</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Match Score</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {[
                { name: 'Elena Gilbert', role: 'Sr. Backend Developer', status: 'Interviewing', score: 92, avatar: 'eg' },
                { name: 'Stefan Salvatore', role: 'Full Stack Engineer', status: 'Screening', score: 88, avatar: 'ss' },
                { name: 'Bonnie Bennett', role: 'UI/UX Designer', status: 'Offer sent', score: 96, avatar: 'bb' },
                { name: 'Damon Salvatore', role: 'AI Specialist', status: 'Rejected', score: 45, avatar: 'ds' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0 border-solid">
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.avatar}`} className="w-9 h-9 rounded-lg" alt="" />
                      <span className="font-bold text-slate-900 dark:text-slate-200">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-5 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight text-xs">{row.role}</td>
                  <td className="px-4 py-5">
                    <Badge 
                      variant={row.status === 'Offer sent' ? 'premium' : row.status === 'Rejected' ? 'outline' : 'default'}
                      className={cn(
                        "rounded-lg px-3 py-1",
                        row.status === 'Interviewing' && "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400",
                        row.status === 'Screening' && "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      )}
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">
                       <span className={cn("font-black", row.score > 90 ? "text-indigo-600" : "text-slate-500")}>{row.score}%</span>
                       <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div className={cn("h-full", row.score > 90 ? "bg-indigo-600" : "bg-slate-300")} style={{width: `${row.score}%`}} />
                       </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

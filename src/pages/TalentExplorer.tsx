import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Heart, Briefcase, MapPin, Gauge, Star, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { talentService } from '../services/api';
import { Talent } from '../types';
import { Card, Badge, Button } from '../components/ui/Shared';
import { cn } from '../lib/utils';

export default function TalentExplorer() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedTalents, setExpandedTalents] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'UI/UX', 'AI', 'DevOps'];

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const data = await talentService.getTalents();
        setTalents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalent();
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedTalents(prev => 
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const filteredTalents = talents.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                         t.role.toLowerCase().includes(search.toLowerCase()) ||
                         t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = activeCategory === 'All' || t.role.toLowerCase().includes(activeCategory.toLowerCase());
    
    let matchesLevel = true;
    if (selectedLevel) {
      const years = parseInt(t.experience);
      if (selectedLevel === 'Junior') matchesLevel = years < 4;
      if (selectedLevel === 'Mid-Level') matchesLevel = years >= 4 && years <= 7;
      if (selectedLevel === 'Senior') matchesLevel = years > 7 && years <= 10;
      if (selectedLevel === 'Lead') matchesLevel = years > 10;
    }

    let matchesRating = true;
    if (selectedRating) {
      const minRating = parseFloat(selectedRating);
      matchesRating = t.rating >= minRating;
    }

    let matchesPrice = true;
    if (selectedPrice) {
      if (selectedPrice === '<$50') matchesPrice = t.hourlyRate < 50;
      if (selectedPrice === '$50-$100') matchesPrice = t.hourlyRate >= 50 && t.hourlyRate <= 100;
      if (selectedPrice === '$100+') matchesPrice = t.hourlyRate > 100;
    }

    return matchesSearch && matchesCategory && matchesLevel && matchesRating && matchesPrice;
  });

  return (
    <div className="pb-20">
      <header className="mb-10">
        <h1 className="text-3xl font-display font-black mb-2 text-slate-900 dark:text-white leading-tight">Talent Explorer</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Discover and connect with top-tier verified professionals globally.</p>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-2">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, role, or skill..." 
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 transition-all bg-white dark:bg-slate-900 text-sm font-bold shadow-sm dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeCategory === cat 
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg shadow-slate-200 dark:shadow-none" 
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <Button 
          variant={showFilters ? "secondary" : "outline"} 
          size="md" 
          className="flex-shrink-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} className="mr-2" /> Filters
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 shadow-xl">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Experience Level</p>
                <div className="flex flex-wrap gap-2">
                  {['Junior', 'Mid-Level', 'Senior', 'Lead'].map(level => (
                    <button 
                      key={level} 
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all",
                        selectedLevel === level 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-500 dark:text-slate-300"
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Rating</p>
                <div className="flex flex-wrap gap-2">
                  {['4.5', '4.8', '5.0'].map(rating => (
                    <button 
                      key={rating} 
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all",
                        selectedRating === rating 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-500 dark:text-slate-300"
                      )}
                    >
                      {rating}+ Stars
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">Hourly Rate</p>
                <div className="flex flex-wrap gap-2">
                  {['<$50', '$50-$100', '$100+'].map(price => (
                    <button 
                      key={price} 
                      onClick={() => setSelectedPrice(selectedPrice === price ? null : price)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all",
                        selectedPrice === price 
                          ? "bg-indigo-600 border-indigo-600 text-white" 
                          : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-500 dark:text-slate-300"
                      )}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-10"></div> {/* Spacer */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[380px] bg-slate-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTalents.map((talent, idx) => {
              const isExpanded = expandedTalents.includes(talent.id);
              const skillsToShow = isExpanded ? talent.skills : talent.skills.slice(0, 5);

              return (
              <motion.div
                key={talent.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="p-6 relative group overflow-hidden h-full flex flex-col hover:border-indigo-500/30" whileHover={{ y: -4 }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img src={talent.avatar} className="w-14 h-14 rounded-xl shadow-inner border border-slate-200 dark:border-slate-800" alt={talent.name} />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                          {talent.name}
                        </h3>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{talent.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleFavorite(talent.id, e)}
                      className={cn(
                        "p-2 transition-colors",
                        favorites.includes(talent.id) ? "text-red-500" : "text-slate-300 dark:text-slate-600 hover:text-red-500"
                      )}
                    >
                      <Heart size={18} fill={favorites.includes(talent.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mb-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded">
                      <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
                      {talent.address.city}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded">
                      <Briefcase size={12} className="text-slate-400 dark:text-slate-500" />
                      {talent.experience}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      {talent.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {skillsToShow.map(skill => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                    {!isExpanded && talent.skills.length > 5 && (
                      <button 
                        onClick={(e) => toggleExpand(talent.id, e)}
                        className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline px-2"
                      >
                        +{talent.skills.length - 5} more
                      </button>
                    )}
                    {isExpanded && talent.skills.length > 5 && (
                      <button 
                        onClick={(e) => toggleExpand(talent.id, e)}
                        className="text-[10px] font-bold text-slate-400 hover:underline px-2"
                      >
                        Show Less
                      </button>
                    )}
                  </div>

                  <div className="mt-auto space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest mb-1">AI Match Score</span>
                        <div className="flex items-center gap-2">
                           <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${talent.matchScore}%` }}
                                className="h-full bg-indigo-600" 
                              />
                           </div>
                           <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{talent.matchScore}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-500 tracking-widest">Pricing</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">${talent.hourlyRate}/hr</p>
                      </div>
                    </div>

                    <Link to={`/talent/${talent.id}`}>
                      <Button className="w-full">
                        View Intelligence <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )})}
          </div>
        </AnimatePresence>
      )}

      {!loading && filteredTalents.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Search className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={48} />
          <h3 className="text-lg font-bold mb-2 dark:text-white">No matches found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Adjust your search or category to find more talent.</p>
          <Button variant="outline" size="sm" onClick={() => { 
            setSearch(''); 
            setActiveCategory('All'); 
            setSelectedLevel(null);
            setSelectedRating(null);
            setSelectedPrice(null);
          }} className="mt-6">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

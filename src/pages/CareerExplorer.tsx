import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { MOCK_CAREERS, CareerInfo } from '../services/mockData';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Landmark, DollarSign, BarChart2, Briefcase, Bookmark, BookmarkCheck, ArrowRight, Brain, Zap, Target, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const CareerExplorer: React.FC = () => {
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState<CareerInfo>(MOCK_CAREERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedCareers, setSavedCareers] = useState<string[]>([]);

  const toggleSavedCareer = (id: string) => {
    if (savedCareers.includes(id)) {
      setSavedCareers(savedCareers.filter(c => c !== id));
    } else {
      setSavedCareers([...savedCareers, id]);
    }
  };

  const filteredCareers = MOCK_CAREERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data for salary growth chart
  const salaryGrowthData = [
    { year: '2024', salary: parseInt(selectedCareer.salaryRange.split('-')[0].replace(/[^0-9]/g, '')) },
    { year: '2025', salary: parseInt(selectedCareer.salaryRange.split('-')[0].replace(/[^0-9]/g, '')) * 1.15 },
    { year: '2026', salary: parseInt(selectedCareer.salaryRange.split('-')[0].replace(/[^0-9]/g, '')) * 1.35 },
    { year: '2027', salary: parseInt(selectedCareer.salaryRange.split('-')[0].replace(/[^0-9]/g, '')) * 1.60 },
    { year: '2028', salary: parseInt(selectedCareer.salaryRange.split('-')[1].replace(/[^0-9]/g, '')) },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 font-sans pb-10">
      
      {/* Sidebar Selector List */}
      <div className="xl:col-span-1 space-y-4">
        <div className="glass-panel p-4 sticky top-24">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" /> Career Paths
          </h3>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1117] border border-slate-700/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredCareers.map(career => {
              const isSaved = savedCareers.includes(career.id);
              return (
                <button
                  key={career.id}
                  onClick={() => setSelectedCareer(career)}
                  className={`w-full p-4 rounded-2xl border text-left transition duration-200 cursor-pointer relative overflow-hidden group
                    ${selectedCareer.id === career.id 
                      ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                      : 'bg-[#161b22]/50 border-slate-700/30 hover:border-slate-600/50 hover:bg-[#161b22]'}`}
                >
                  {selectedCareer.id === career.id && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm font-bold transition-colors ${selectedCareer.id === career.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {career.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">{career.category}</p>
                    </div>
                    {isSaved && <Bookmark className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Details Pane */}
      <motion.div 
        key={selectedCareer.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="xl:col-span-3 space-y-6"
      >
        {/* Header Hero */}
        <div className="relative rounded-[2rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-10">
          <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-indigo-500/10 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 tracking-widest uppercase">
                <Brain className="w-3.5 h-3.5" />
                <span>AI Match: 94% Compatibility</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
                {selectedCareer.name}
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {selectedCareer.overview}
              </p>
            </div>
            
            <button
              onClick={() => toggleSavedCareer(selectedCareer.id)}
              className="shrink-0 p-4 bg-[#161b22] border border-slate-700/50 hover:border-indigo-500 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-400 rounded-2xl transition cursor-pointer flex items-center justify-center shadow-lg"
            >
              {savedCareers.includes(selectedCareer.id) ? (
                <BookmarkCheck className="w-6 h-6 text-indigo-400" />
              ) : (
                <Bookmark className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Average Base Salary (INR)</span>
              <span className="text-2xl font-black text-white font-display">{selectedCareer.salaryRange}</span>
            </div>
          </div>

          <div className="glass-panel p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <BarChart2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">YoY Industry Growth</span>
              <span className="text-2xl font-black text-white font-display">{selectedCareer.growthRate}</span>
            </div>
          </div>
        </div>

        {/* Chart & Skills Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Growth Chart */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Projected Salary Growth</h3>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}L`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                    formatter={(value) => [`₹${value} LPA`, 'Salary']}
                  />
                  <Area type="monotone" dataKey="salary" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#salaryGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Required */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Required Tech Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.requiredSkills.map((sk, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-semibold bg-[#161b22] text-slate-300 rounded-lg border border-slate-700/50 hover:border-amber-500/50 hover:text-white transition-colors cursor-default">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Target Exams / Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.exams.map((ex, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap and Companies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
             <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Milestone Roadmap</h3>
              </div>
              <button className="text-xs text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1">Generate AI Plan <ArrowRight className="w-3 h-3" /></button>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              {selectedCareer.roadmap.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#0d1117] bg-rose-500/20 text-rose-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-black text-[10px]">
                    {i + 1}
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl bg-[#161b22] border border-slate-700/50 shadow-sm text-sm text-slate-300 group-hover:border-rose-500/30 transition-colors">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Landmark className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Top Recruiting Companies</h3>
            </div>
            <div className="flex flex-wrap gap-3 mt-auto mb-auto">
              {selectedCareer.companies.map((co, i) => (
                <div key={i} className="px-4 py-3 bg-[#161b22] border border-slate-700/50 rounded-xl flex items-center gap-3 w-full sm:w-[calc(50%-0.5rem)] hover:bg-[#1c222b] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-white group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                    {co[0]}
                  </div>
                  <span className="text-sm font-semibold text-slate-200">{co}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800/60">
              <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest text-center">Typical Daily Tasks</h4>
              <ul className="space-y-3">
                {selectedCareer.dailyWork.slice(0, 3).map((wk, i) => (
                  <li key={i} className="text-slate-400 text-xs flex items-start gap-2 bg-[#161b22]/50 p-3 rounded-lg">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" /> <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

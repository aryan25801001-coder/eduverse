import React, { useState } from 'react';
import { MOCK_SCHOLARSHIPS } from '../services/mockData';
import { motion } from 'framer-motion';
import { Landmark, Calendar, DollarSign, ArrowUpRight, Bookmark, BookmarkCheck, Search, Filter, Award, Clock, CheckCircle2 } from 'lucide-react';

export const ScholarshipHub: React.FC = () => {
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const toggleSaved = (id: string) => {
    setSavedScholarships(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const categories = ['All', 'Government', 'Corporate', 'International', 'Merit-Based'];

  const filteredScholarships = MOCK_SCHOLARSHIPS.filter(s =>
    (filter === 'All' || s.provider?.toLowerCase().includes(filter.toLowerCase())) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.provider?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Hero */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-amber-500/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-emerald-500/8 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-400 tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" /> Financial Aid & Grants
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Fund your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">education.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Discover government fellowships, corporate grants, and international scholarships to fund your dreams.
            </p>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-3 shrink-0">
            {[
              { label: '200+', desc: 'Scholarships' },
              { label: '₹50Cr+', desc: 'Total Aid' },
              { label: '98%', desc: 'Success Rate' }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161b22]/80 border border-slate-700/50 text-center">
                <span className="text-2xl font-black text-white block">{stat.label}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sticky top-20 z-20 bg-[#06060c]/80 backdrop-blur-xl py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-none
                ${filter === cat ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]' : 'bg-[#161b22] border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scholarships..."
            className="w-full bg-[#161b22] border border-slate-700/50 focus:border-amber-500 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500" />
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredScholarships.map((scholarship, idx) => {
          const isSaved = savedScholarships.includes(scholarship.id);
          return (
            <motion.div key={scholarship.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-3xl border border-slate-800/60 overflow-hidden flex flex-col hover:border-slate-600/50 hover:shadow-2xl transition-all group">
              {/* Header */}
              <div className="p-6 border-b border-slate-800/60">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    <Landmark className="w-6 h-6 text-amber-400" />
                  </div>
                  <button onClick={() => toggleSaved(scholarship.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isSaved ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-[#161b22] border-slate-700 text-slate-400 hover:border-amber-500/50 hover:text-amber-400'}`}>
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] font-black text-amber-400/80 uppercase tracking-widest block mb-2">{scholarship.provider}</span>
                <h3 className="text-lg font-black text-white font-display leading-snug group-hover:text-amber-400 transition-colors">{scholarship.name}</h3>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-6 border-b border-slate-800/60">
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Grant Amount</span>
                  </div>
                  <span className="text-lg font-black text-emerald-400">{scholarship.amount}</span>
                </div>
                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deadline</span>
                  </div>
                  <span className="text-sm font-black text-white">{scholarship.deadline?.split(',')[0]}</span>
                </div>
              </div>

              {/* Eligibility */}
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-bold text-white">Eligibility Criteria</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{scholarship.eligibility}</p>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a href={scholarship.link} target="_blank" rel="noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20 cursor-pointer text-sm">
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

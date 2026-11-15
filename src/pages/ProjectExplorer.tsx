import React, { useState } from 'react';
import { MOCK_PROJECTS } from '../services/mockData';
import { motion } from 'framer-motion';
import { Code2, GitFork, Layers, Zap, Search, ChevronRight, ExternalLink } from 'lucide-react';

const difficultyConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Beginner: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-400' },
  Intermediate: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-400' },
  Advanced: { color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', dot: 'bg-rose-400' },
};

export const ProjectExplorer: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'AI/ML', 'Web Dev', 'Cybersecurity', 'Data Science'];

  const filteredProjects = MOCK_PROJECTS.filter(p => {
    const matchCat = filter === 'All' || p.category.includes(filter);
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Hero */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-violet-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 tracking-widest uppercase">
              <Code2 className="w-3.5 h-3.5" /> AI-Curated Project Library
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Build real-world <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">projects.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Explore 500+ industry-grade projects from Beginner to Advanced. Each comes with a full implementation roadmap and tech stack.
            </p>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-3 shrink-0">
            {[
              { label: '500+', desc: 'Projects' },
              { label: '15+', desc: 'Domains' },
              { label: '3x', desc: 'Career Boost' }
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
                ${filter === cat ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]' : 'bg-[#161b22] border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..."
            className="w-full bg-[#161b22] border border-slate-700/50 focus:border-violet-500 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500" />
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => {
          const diff = difficultyConfig[project.difficulty] || difficultyConfig.Beginner;
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
              className="glass-panel rounded-3xl border border-slate-800/60 overflow-hidden flex flex-col hover:border-slate-600/50 hover:shadow-2xl transition-all group">
              {/* Card Header */}
              <div className="p-6 border-b border-slate-800/60">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black rounded-lg border ${diff.bg} ${diff.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                    {project.difficulty}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-[#161b22] border border-slate-800 px-2.5 py-1 rounded-lg">{project.category}</span>
                </div>
                <h3 className="text-xl font-black text-white font-display leading-snug mb-2 group-hover:text-violet-400 transition-colors">{project.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack */}
              <div className="px-6 py-4 border-b border-slate-800/60">
                <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-widest mb-3">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-semibold bg-[#161b22] border border-slate-700/50 text-slate-200 rounded-lg hover:border-violet-500/50 hover:text-violet-300 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Roadmap */}
              <div className="px-6 py-4 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-bold text-white">Implementation Steps</span>
                </div>
                <div className="space-y-2">
                  {project.roadmap.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-[#161b22]/50 hover:bg-[#1c222b] transition-colors">
                      <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-xs text-slate-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-[#161b22] border border-slate-700/50 hover:border-violet-500 hover:text-violet-400 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer">
                  <GitFork className="w-4 h-4" /> Fork on GitHub
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-violet-900/20">
                  Start Project <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

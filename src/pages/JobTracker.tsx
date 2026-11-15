import React, { useState } from 'react';
import { useDashboard, JobApplication } from '../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowRight, Plus, PlusCircle, X, Building2, TrendingUp, Clock, CheckCircle2, Trophy } from 'lucide-react';

const columnConfig: { id: JobApplication['status']; label: string; emoji: string; color: string; border: string; count_bg: string }[] = [
  { id: 'saved', label: 'Wishlist', emoji: '🔖', color: 'text-slate-300', border: 'border-slate-700/50', count_bg: 'bg-slate-800 text-slate-300' },
  { id: 'applied', label: 'Applied', emoji: '📤', color: 'text-blue-300', border: 'border-blue-700/30', count_bg: 'bg-blue-900/50 text-blue-300' },
  { id: 'interviewing', label: 'Interviewing', emoji: '🎤', color: 'text-purple-300', border: 'border-purple-700/30', count_bg: 'bg-purple-900/50 text-purple-300' },
  { id: 'offer', label: 'Offer 🎉', emoji: '🏆', color: 'text-emerald-300', border: 'border-emerald-700/30', count_bg: 'bg-emerald-900/50 text-emerald-300' },
];

const nextStageMap: Record<string, JobApplication['status']> = {
  saved: 'applied', applied: 'interviewing', interviewing: 'offer'
};

export const JobTracker: React.FC = () => {
  const { jobs, addJob, updateJobStatus } = useDashboard();
  const [showAdd, setShowAdd] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState<JobApplication['status']>('saved');

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    addJob(company, role, status, salary);
    setCompany(''); setRole(''); setSalary(''); setShowAdd(false);
  };

  const totalApps = jobs.length;
  const offerCount = jobs.filter(j => j.status === 'offer').length;

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Hero */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-10">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-indigo-500/8 blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 tracking-widest uppercase">
              <Briefcase className="w-3.5 h-3.5" /> Job Application Tracker
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Your application <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">pipeline.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Manage every job application — from saved positions to signed offers — in one clean Kanban board.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <div className="text-center p-5 rounded-2xl bg-[#161b22] border border-slate-700/50 min-w-[100px]">
              <span className="text-3xl font-black text-white block">{totalApps}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Applications</span>
            </div>
            <div className="text-center p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 min-w-[100px]">
              <span className="text-3xl font-black text-emerald-400 block">{offerCount}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Application Button */}
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(!showAdd)}
          className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-900/30 transition-colors">
          <PlusCircle className="w-5 h-5" /> {showAdd ? 'Cancel' : 'Add Application'}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.form onSubmit={handleAddJob} initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
            className="glass-panel rounded-2xl border border-indigo-500/30 p-6 space-y-5 overflow-hidden">
            <div className="flex justify-between items-center">
              <h4 className="text-base font-bold text-white">New Application Entry</h4>
              <button type="button" onClick={() => setShowAdd(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Company Name *</label>
                <input type="text" required value={company} onChange={e => setCompany(e.target.value)} placeholder="Google, Microsoft, Swiggy..."
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Role Title *</label>
                <input type="text" required value={role} onChange={e => setRole(e.target.value)} placeholder="Software Engineer, PM, Designer..."
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Expected Salary</label>
                <input type="text" value={salary} onChange={e => setSalary(e.target.value)} placeholder="₹22L/Yr, $120k..."
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2">Current Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as any)}
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer">
                  <option value="saved">Saved / Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offer">Received Offer</option>
                </select>
              </div>
            </div>
            <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm cursor-pointer shadow-lg transition-colors">
              Add to Pipeline
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {columnConfig.map(col => {
          const colJobs = jobs.filter(j => j.status === col.id);
          return (
            <div key={col.id} className={`rounded-3xl border ${col.border} bg-[#161b22]/30 p-4 min-h-[400px] flex flex-col space-y-4`}>
              {/* Column Header */}
              <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{col.emoji}</span>
                  <span className={`text-sm font-black ${col.color}`}>{col.label}</span>
                </div>
                <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg ${col.count_bg}`}>{colJobs.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                <AnimatePresence>
                  {colJobs.map((job, i) => (
                    <motion.div key={job.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 rounded-2xl bg-[#0d1117] border border-slate-800/60 space-y-3 hover:border-slate-700 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#161b22] border border-slate-700 flex items-center justify-center font-black text-sm text-white shrink-0">
                          {job.company[0]}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white leading-tight">{job.role}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 font-semibold flex items-center gap-1">
                            <Building2 className="w-3 h-3" /> {job.company}
                          </p>
                        </div>
                      </div>
                      
                      {job.salary && (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-lg">
                          <TrendingUp className="w-3 h-3" /> {job.salary}
                        </div>
                      )}

                      {col.id !== 'offer' && (
                        <button
                          onClick={() => updateJobStatus(job.id, nextStageMap[col.id])}
                          className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#161b22] border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400 text-slate-400 rounded-xl text-xs font-bold transition-all cursor-pointer">
                          Move to Next Stage <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {col.id === 'offer' && (
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 justify-center py-2">
                          <CheckCircle2 className="w-4 h-4" /> Congratulations! 🎉
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colJobs.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-slate-600 space-y-2">
                    <Briefcase className="w-8 h-8 opacity-30" />
                    <p className="text-xs font-medium text-center">No applications here yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MOCK_STREAMS, StreamInfo } from '../services/mockData';
import { Sparkles, CheckCircle2, AlertTriangle, Briefcase, Zap, TrendingUp } from 'lucide-react';

export const StreamExplorer: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<StreamInfo>(MOCK_STREAMS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      {/* Sidebar selection column */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white font-display uppercase tracking-widest px-2">Academic Streams</h3>
        {MOCK_STREAMS.map(stream => (
          <button
            key={stream.id}
            onClick={() => setSelectedStream(stream)}
            className={`w-full p-4 rounded-2xl border text-left transition duration-200 cursor-pointer
              ${selectedStream.id === stream.id 
                ? 'bg-gradient-to-tr from-brand-blue/10 to-brand-purple/10 border-brand-blue text-white' 
                : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'}`}
          >
            <p className="text-xs font-bold">{stream.name}</p>
            <span className="inline-flex px-2 py-0.5 mt-2 text-[9px] font-semibold text-slate-400 bg-white/[0.04] border border-white/[0.04] rounded-full">
              Growth: {stream.growth}
            </span>
          </button>
        ))}
      </div>

      {/* Main Details View */}
      <div className="lg:col-span-2 glass-panel p-6 lg:p-8 rounded-3xl space-y-6 border border-white/[0.04] relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none" />
        
        {/* Stream Header */}
        <div className="space-y-2 border-b border-slate-850 pb-6">
          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Cognitive Profile Analyzer</span>
          <h2 className="text-2xl font-bold font-display text-white">{selectedStream.name}</h2>
          <p className="text-slate-400 text-xs leading-relaxed">{selectedStream.overview}</p>
        </div>

        {/* Pros & Cons Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Opportunities & Advantages
            </h4>
            <ul className="space-y-2">
              {selectedStream.pros.map((pro, i) => (
                <li key={i} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                  <span className="text-emerald-500/80">•</span> <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-4 rounded-2xl bg-rose-500/[0.02] border border-rose-500/10 space-y-3">
            <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Challenges & Cons
            </h4>
            <ul className="space-y-2">
              {selectedStream.cons.map((con, i) => (
                <li key={i} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                  <span className="text-rose-500/80">•</span> <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Required Skills & Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-850">
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1">
              <Zap className="w-4 h-4 text-brand-blue" /> Recommended Aptitude
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedStream.skillsRequired.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 text-[10px] bg-slate-900 text-slate-300 rounded-full border border-slate-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-brand-purple" /> Market Trend Rate
            </h4>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
              <span className="text-lg font-bold text-white font-display">{selectedStream.growth}</span>
              <span className="text-[10px] text-slate-500">Projected demand rate globally</span>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        <div className="space-y-3 pt-4 border-t border-slate-850">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-brand-blue" /> Prominent Career Pathways
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {selectedStream.opportunities.map((opt, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.01] border border-slate-800 text-center hover:border-slate-700 transition">
                <span className="text-xs font-medium text-slate-300">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

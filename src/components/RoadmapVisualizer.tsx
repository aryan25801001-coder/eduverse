import React from 'react';
import { Roadmap } from '../types/course';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoadmapVisualizerProps {
  roadmap: Roadmap;
}

export const RoadmapVisualizer: React.FC<RoadmapVisualizerProps> = ({ roadmap }) => {
  if (!roadmap || !roadmap.steps) return null;

  return (
    <div className="bg-[#0a0a0f] border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="mb-8 relative z-10">
        <h2 className="text-2xl md:text-3xl font-black text-white font-display">Career Roadmap: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{roadmap.career}</span></h2>
        <p className="text-slate-400 mt-2 text-sm max-w-3xl">{roadmap.description}</p>
      </div>

      <div className="relative z-10 space-y-6">
        {roadmap.steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4 md:gap-6 relative"
          >
            {/* Timeline Line */}
            {idx !== roadmap.steps.length - 1 && (
              <div className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-gradient-to-b from-blue-600 to-slate-800" />
            )}
            
            {/* Step Number Badge */}
            <div className="shrink-0 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#161b22] border-2 border-blue-500 flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                {step.step_number}
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-[#161b22] border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-colors">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 {step.title}
                 <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-50" />
              </h3>
              <p className="text-slate-400 text-sm mt-1 mb-4">{step.description}</p>
              
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Key Skills</div>
                <div className="flex flex-wrap gap-2">
                  {step.recommended_skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

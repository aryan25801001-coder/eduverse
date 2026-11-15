import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Download, Check, Eye, GitBranch, Link2, AlertCircle, Zap, User, GraduationCap, Code, Briefcase } from 'lucide-react';

const TEMPLATES = [
  { id: 'modern', label: 'Modern Dark', desc: 'Sleek glassmorphic design for tech roles', accent: 'from-indigo-500 to-purple-500', headerBg: 'bg-[#0a0a1a]', border: 'border-indigo-500/30' },
  { id: 'minimal', label: 'Minimalist', desc: 'Clean Apple-inspired layout', accent: 'from-slate-400 to-slate-500', headerBg: 'bg-[#111]', border: 'border-slate-700' },
  { id: 'executive', label: 'Executive', desc: 'Premium corporate style for senior roles', accent: 'from-amber-500 to-orange-500', headerBg: 'bg-[#0d0900]', border: 'border-amber-600/30' },
];

const ATS_TIPS = [
  { tip: 'Use keywords from the job description.', icon: Zap, color: 'text-yellow-400' },
  { tip: 'Quantify achievements with numbers (e.g. "Increased performance by 40%").', icon: AlertCircle, color: 'text-blue-400' },
  { tip: 'Avoid tables and graphics — ATS cannot parse them.', icon: AlertCircle, color: 'text-rose-400' },
  { tip: 'Use standard section headers: Work Experience, Education, Skills.', icon: Check, color: 'text-emerald-400' },
];

export const ResumePortfolio: React.FC = () => {
  const { user } = useAuth();
  const [template, setTemplate] = useState('modern');
  const [skills, setSkills] = useState('React, TypeScript, Python, FastAPI, MongoDB, Machine Learning');
  const [experience, setExperience] = useState('Full Stack Developer Intern @ TechCorp — Built REST APIs serving 50k users');
  const [projects, setProjects] = useState('EduVerse AI Platform, Smart Task Planner with NLP, E-Commerce Microservices');
  const [github, setGithub] = useState('github.com/yourprofile');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/yourprofile');
  const [isExporting, setIsExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => { setIsExporting(false); setExportDone(true); setTimeout(() => setExportDone(false), 3000); }, 2000);
  };

  const currentTemplate = TEMPLATES.find(t => t.id === template) || TEMPLATES[0];
  const atsScore = Math.min(95, 50 + skills.split(',').length * 5 + (experience.length > 50 ? 20 : 0));

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Hero */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-pink-500/8 blur-[120px] pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] font-black text-pink-400 tracking-widest uppercase">
            <FileText className="w-3.5 h-3.5" /> AI Resume Builder
          </div>
          <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
            Build an ATS-winning <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">resume.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Create a professional resume powered by AI. Get real-time ATS score, optimization tips, and export to PDF instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left: Editor */}
        <div className="space-y-6">
          {/* Template Selector */}
          <div className="glass-panel rounded-2xl border border-slate-800/60 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-pink-400" /> Choose Template</h3>
            <div className="grid grid-cols-3 gap-3">
              {TEMPLATES.map(t => (
                <button key={t.id} onClick={() => setTemplate(t.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${template === t.id ? `border-pink-500/50 bg-pink-500/10` : 'border-slate-700/50 bg-[#161b22] hover:border-slate-600'}`}>
                  <div className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${t.accent}`} />
                  <span className={`text-xs font-bold ${template === t.id ? 'text-white' : 'text-slate-300'}`}>{t.label}</span>
                  <span className="text-[10px] text-slate-500">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="glass-panel rounded-2xl border border-slate-800/60 p-6 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2"><User className="w-5 h-5 text-indigo-400" /> Your Information</h3>

            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Technical Skills (comma-separated)</label>
              <textarea value={skills} onChange={e => setSkills(e.target.value)} rows={3}
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-pink-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600"
                placeholder="React, Python, Node.js, AWS..." />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Work / Internship Experience</label>
              <textarea value={experience} onChange={e => setExperience(e.target.value)} rows={3}
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-pink-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600"
                placeholder="Role @ Company — What you built, impact achieved..." />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Key Projects</label>
              <textarea value={projects} onChange={e => setProjects(e.target.value)} rows={2}
                className="w-full bg-[#0d1117] border border-slate-700 focus:border-pink-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors resize-none placeholder:text-slate-600"
                placeholder="Project 1, Project 2..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2 flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" /> GitHub</label>
                <input type="text" value={github} onChange={e => setGithub(e.target.value)}
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-pink-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2 flex items-center gap-1"><Link2 className="w-3.5 h-3.5" /> LinkedIn</label>
                <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)}
                  className="w-full bg-[#0d1117] border border-slate-700 focus:border-pink-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors" />
              </div>
            </div>

            <button onClick={handleExport} disabled={isExporting}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/20 disabled:opacity-60 text-base cursor-pointer">
              {isExporting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Generating PDF...</>
               : exportDone ? <><Check className="w-5 h-5" /> Resume Downloaded!</>
               : <><Download className="w-5 h-5" /> Export Resume PDF</>}
            </button>
          </div>

          {/* ATS Tips */}
          <div className="glass-panel rounded-2xl border border-slate-800/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400" /> ATS Optimization Tips</h3>
            <div className="space-y-3">
              {ATS_TIPS.map((t, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#161b22] rounded-xl border border-slate-800/60">
                  <t.icon className={`w-4 h-4 shrink-0 mt-0.5 ${t.color}`} />
                  <p className="text-xs text-slate-300">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="space-y-6 sticky top-24 self-start">
          {/* ATS Score */}
          <div className="glass-panel rounded-2xl border border-slate-800/60 p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /> ATS Score</h3>
              <span className={`text-2xl font-black ${atsScore >= 80 ? 'text-emerald-400' : atsScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{atsScore}%</span>
            </div>
            <div className="h-3 bg-[#161b22] rounded-full overflow-hidden">
              <motion.div className={`h-full rounded-full bg-gradient-to-r ${atsScore >= 80 ? 'from-emerald-600 to-emerald-400' : atsScore >= 60 ? 'from-amber-600 to-amber-400' : 'from-rose-600 to-rose-400'}`}
                initial={{ width: 0 }} animate={{ width: `${atsScore}%` }} transition={{ duration: 0.8 }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">{atsScore >= 80 ? '✅ Excellent! Your resume should pass most ATS systems.' : '⚠️ Add more keywords and quantifiable achievements to boost your score.'}</p>
          </div>

          {/* Resume Preview */}
          <div className={`rounded-2xl border ${currentTemplate.border} ${currentTemplate.headerBg} overflow-hidden shadow-2xl`}>
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${currentTemplate.accent} bg-opacity-10 relative`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${currentTemplate.accent} opacity-10`} />
              <div className="relative text-center space-y-1">
                <h2 className="text-2xl font-black text-white">{user?.name || 'Your Name'}</h2>
                <p className="text-sm text-slate-300">{user?.email || 'email@example.com'}</p>
                <div className="flex justify-center gap-6 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1"><GitBranch className="w-3 h-3" /> {github}</span>
                  <span className="flex items-center gap-1"><Link2 className="w-3 h-3" /> {linkedin}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Education */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Education
                </h4>
                <p className="text-sm text-slate-200 font-semibold">{user?.academicProfile?.classLevel || 'B.Tech Computer Science'}</p>
                <p className="text-xs text-slate-400">Career Goal: <span className="text-indigo-400 font-bold">{user?.academicProfile?.careerGoal || 'AI/ML Engineer'}</span></p>
              </div>

              {/* Experience */}
              {experience && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Experience
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{experience}</p>
                </div>
              )}

              {/* Skills */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.split(',').map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] font-semibold bg-[#161b22] border border-slate-800 text-slate-200 rounded-md">{sk.trim()}</span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2 mb-3">Projects</h4>
                <ul className="space-y-1.5">
                  {projects.split(',').map((pr, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /> {pr.trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

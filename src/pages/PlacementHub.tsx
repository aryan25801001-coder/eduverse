import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HelpCircle, CheckSquare, MessageSquare, Award, Brain, Code, Target, ChevronDown, ChevronUp, Sparkles, Play, Clock, Star } from 'lucide-react';

const qaData = [
  {
    category: 'DSA',
    q: "Explain time complexity of quicksort in best and worst cases.",
    a: "Best case: O(n log n) occurs when the partition splits the list evenly. Worst case: O(n²) occurs when partition always picks the smallest/largest element (e.g. already sorted arrays). Average case is O(n log n) with good pivot selection."
  },
  {
    category: 'System Design',
    q: "How would you design a URL shortener like bit.ly?",
    a: "Use a hash function (MD5/Base62) to generate a 6-character short code. Store mappings in a NoSQL DB (Cassandra/DynamoDB) for scale. Use Redis for caching popular URLs. Add a load balancer and CDN for global distribution. Handle collisions with re-hashing."
  },
  {
    category: 'Web Dev',
    q: "What is the difference between Virtual DOM and Shadow DOM?",
    a: "Virtual DOM is a lightweight in-memory copy of the real DOM used by React to batch and optimize UI updates via diffing. Shadow DOM is a W3C web standard for encapsulating styles and markup in Web Components, creating isolated DOM trees."
  },
  {
    category: 'Backend',
    q: "How does FastAPI handle asynchronous requests?",
    a: "FastAPI is built on Starlette and Uvicorn, supporting Python's async/await natively. Async endpoints run directly on the event loop for high-concurrency I/O tasks. Synchronous endpoints run in a thread pool executor to avoid blocking."
  },
  {
    category: 'AI/ML',
    q: "Explain the difference between Supervised, Unsupervised, and Reinforcement Learning.",
    a: "Supervised: Model learns from labeled data (input → output mapping). Examples: regression, classification. Unsupervised: Model finds patterns in unlabeled data. Examples: clustering, dimensionality reduction. Reinforcement: An agent learns by interacting with an environment and maximizing cumulative rewards via trial and error."
  },
  {
    category: 'OS/Networking',
    q: "What happens when you type a URL in a browser and hit Enter?",
    a: "1. DNS Lookup: Resolve domain to IP. 2. TCP Handshake: Establish connection to server. 3. TLS Handshake: If HTTPS, negotiate encryption. 4. HTTP Request: Send GET request. 5. Server processes and sends back HTML. 6. Browser parses HTML, loads CSS/JS. 7. Page renders."
  }
];

const checklist = [
  { title: 'Technical Portfolio Ready', desc: 'GitHub repos public with clear READMEs. At least 3 strong projects showcasing your skills.', icon: Code, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { title: 'Data Structures & Algorithms', desc: 'Revise Arrays, LinkedLists, Trees, Graphs, DP, Sorting. Practice on LeetCode (Easy → Medium).', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { title: 'System Design Concepts', desc: 'Study load balancing, caching (Redis), DB scaling, microservices, and CDN architecture.', icon: Target, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
  { title: 'STAR Behavioral Stories', desc: 'Prepare 3-5 structured stories using Situation-Task-Action-Result for leadership and teamwork questions.', icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { title: 'Resume & LinkedIn Optimized', desc: 'ATS-friendly resume, updated LinkedIn with skills, projects, and a professional headshot.', icon: Award, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { title: 'AI Mock Interview Done', desc: 'Complete at least one full mock technical + HR interview session with the EduVerse AI Mentor.', icon: Sparkles, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
];

export const PlacementHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'tech' | 'checklist'>('tech');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [checked, setChecked] = useState<boolean[]>(Array(checklist.length).fill(false));

  const toggleCheck = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  const completedCount = checked.filter(Boolean).length;

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Hero */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl p-8 md:p-12">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-rose-500/8 blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black text-rose-400 tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> Interview & Placement Prep
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Crack your dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">interview.</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">
              Master DSA, system design, behavioral questions, and get AI-powered mock interviews to land your dream job.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-900/20">
              <Play className="w-5 h-5" /> Start AI Mock Interview
            </button>
          </div>
          <div className="hidden md:flex flex-col gap-3 shrink-0">
            {[
              { label: '500+', desc: 'Interview Q&As', color: 'text-rose-400' },
              { label: '50+', desc: 'Company Specific', color: 'text-amber-400' },
              { label: '24/7', desc: 'AI Practice', color: 'text-emerald-400' },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#161b22]/80 border border-slate-700/50 flex items-center gap-4">
                <span className={`text-2xl font-black ${s.color}`}>{s.label}</span>
                <span className="text-xs text-slate-400 font-medium">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="flex gap-3 border-b border-slate-800 pb-1">
        <button onClick={() => setActiveCategory('tech')}
          className={`px-6 py-3 text-sm font-bold transition-all cursor-pointer rounded-t-xl border-b-2 ${activeCategory === 'tech' ? 'text-white border-rose-500' : 'text-slate-400 border-transparent hover:text-white'}`}>
          Technical Questions
        </button>
        <button onClick={() => setActiveCategory('checklist')}
          className={`px-6 py-3 text-sm font-bold transition-all cursor-pointer rounded-t-xl border-b-2 flex items-center gap-2 ${activeCategory === 'checklist' ? 'text-white border-rose-500' : 'text-slate-400 border-transparent hover:text-white'}`}>
          Interview Checklist
          {completedCount > 0 && (
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded-full">{completedCount}/{checklist.length}</span>
          )}
        </button>
      </div>

      {activeCategory === 'tech' ? (
        <div className="space-y-4">
          {qaData.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-2xl border border-slate-800/60 overflow-hidden hover:border-slate-700 transition-all">
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer">
                <div className="flex items-start gap-4 flex-1">
                  <span className="shrink-0 px-2.5 py-1.5 text-[9px] font-black bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg uppercase tracking-widest">{item.category}</span>
                  <h4 className="text-sm font-bold text-white leading-relaxed">{item.q}</h4>
                </div>
                {openIdx === idx ? <ChevronUp className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />}
              </button>
              {openIdx === idx && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="px-6 pb-6 border-t border-slate-800/60">
                  <p className="text-sm text-slate-300 leading-relaxed pt-4">{item.a}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 bg-[#161b22] border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-400 rounded-lg text-xs font-bold transition-all cursor-pointer">
                      Practice Similar
                    </button>
                    <button className="px-4 py-2 bg-[#161b22] border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Ask AI Mentor
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800/60">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-white">Interview Readiness Score</span>
              <span className="text-sm font-black text-emerald-400">{Math.round((completedCount / checklist.length) * 100)}%</span>
            </div>
            <div className="h-3 bg-[#161b22] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / checklist.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">{completedCount} of {checklist.length} items completed</p>
          </div>

          {checklist.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`glass-panel rounded-2xl border p-6 flex items-start gap-5 cursor-pointer transition-all hover:shadow-xl
                  ${checked[i] ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800/60 hover:border-slate-600'}`}
                onClick={() => toggleCheck(i)}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${checked[i] ? 'bg-emerald-500/20 border-emerald-500/30' : `${item.bg}`}`}>
                  {checked[i] ? <ShieldCheck className="w-6 h-6 text-emerald-400" /> : <Icon className={`w-6 h-6 ${item.color}`} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className={`text-base font-black ${checked[i] ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>{item.title}</h4>
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${checked[i] ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>
                      {checked[i] && <CheckSquare className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

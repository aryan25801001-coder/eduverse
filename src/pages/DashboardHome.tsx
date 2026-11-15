import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboard } from '../context/DashboardContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { 
  Sparkles, CheckCircle2, Circle, Flame, Target, 
  BookOpen, Plus, Calendar, Compass, FileText, ArrowUpRight 
} from 'lucide-react';

interface DashboardHomeProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { tasks, habits, toggleTask, toggleHabit, addTask } = useDashboard();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Weekly analytical data for the progress chart
  const data = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 5.5 },
    { day: 'Fri', hours: 6.2 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 5.0 }
  ];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    addTask(newTaskTitle, 'Daily', 'medium', new Date().toISOString().split('T')[0]);
    setNewTaskTitle('');
  };

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasksCount = tasks.length;
  const activeHabitStreak = habits.reduce((max, h) => h.streak > max ? h.streak : max, 0);

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="relative p-6 lg:p-8 rounded-3xl overflow-hidden glass-panel border border-white/[0.04]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-widest">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>EduVerse Operating System Active</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold font-display text-white">
              Welcome back, {user?.name || 'Aman Sharma'}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Your profile is optimized for <strong className="text-white">{user?.academicProfile?.classLevel || 'Class 11'}</strong> targeting a career as an <strong className="text-brand-purple">{user?.academicProfile?.careerGoal || 'AI & ML Engineer'}</strong>.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Habit Streak</span>
              <span className="text-xl font-bold text-amber-400 font-display flex items-center gap-1 mt-1 justify-center">
                <Flame className="w-5 h-5 fill-amber-400/20" /> {activeHabitStreak} Days
              </span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Task Focus</span>
              <span className="text-xl font-bold text-white font-display block mt-1">
                {completedTasksCount}/{totalTasksCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Analytics Rechart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4 border border-white/[0.04]">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white font-display">Study Time Analytics</h3>
              <p className="text-slate-500 text-[11px]">Hours spent coding and studying over the past 7 days.</p>
            </div>
            <span className="text-xs text-brand-blue font-semibold flex items-center gap-1 cursor-pointer">
              Weekly Overview <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(8, 5, 25, 0.85)', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px'
                  }} 
                  labelStyle={{ color: '#94a3b8', fontSize: '11px' }}
                  itemStyle={{ color: '#ffffff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#00f2fe" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Quick Actions & Habits */}
        <div className="glass-panel p-6 rounded-3xl space-y-6 border border-white/[0.04]">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
            <Flame className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10 animate-pulse" />
            Daily Habit Streaks
          </h3>

          <div className="space-y-3">
            {habits.map((habit) => (
              <div 
                key={habit.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] transition"
              >
                <div>
                  <p className="text-xs font-semibold text-slate-200">{habit.name}</p>
                  <p className="text-[10px] text-slate-500">{habit.streak} day streak</p>
                </div>
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer
                    ${habit.completedToday 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-transparent'}`}
                >
                  {habit.completedToday ? 'Done' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setActiveTab('study-planner')}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-brand-blue/30 text-left transition text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Study Planner
              </button>
              <button 
                onClick={() => setActiveTab('career-explorer')}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-brand-purple/30 text-left transition text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-brand-purple" /> Careers List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Manager Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-4 border border-white/[0.04]">
          <h3 className="text-sm font-bold text-white font-display">Target Study Checklist</h3>

          {/* Add task bar */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add new revision or application task..."
              className="flex-1 glass-input px-3 py-2 text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/80 text-[#030014] font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </form>

          {/* Tasks loop */}
          <div className="space-y-2 pt-2">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.06] transition"
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className="text-slate-500 hover:text-white transition cursor-pointer"
                >
                  {task.completed 
                    ? <CheckCircle2 className="w-5 h-5 text-brand-blue fill-brand-blue/10" /> 
                    : <Circle className="w-5 h-5" />}
                </button>
                <span className={`text-xs ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                  {task.title}
                </span>
                <span className="ml-auto px-2 py-0.5 text-[9px] bg-white/[0.03] border border-white/[0.04] text-slate-400 rounded-full capitalize">
                  {task.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Goal Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between">
          <div className="space-y-3">
            <span className="px-2.5 py-1 text-[10px] bg-brand-blue/15 text-brand-blue rounded-full font-bold uppercase tracking-wider">Primary Target Goal</span>
            <h4 className="text-base font-bold text-white font-display">Crack the Top-Tier Placement</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Based on your target of becoming an **AI Engineer**, the system has selected **IIT Bombay M.Tech** or **bulge bracket companies** as the optimum outcome.
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Milestone Progress</span>
              <span className="font-semibold text-brand-purple">40% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-blue to-brand-purple w-[40%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

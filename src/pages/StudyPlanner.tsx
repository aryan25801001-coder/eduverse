import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Sparkles, CalendarCheck, Clock, CheckSquare, Plus, Trash2 } from 'lucide-react';

export const StudyPlanner: React.FC = () => {
  const { tasks, habits, addTask, toggleTask, deleteTask, toggleHabit } = useDashboard();
  const [plannerTab, setPlannerTab] = useState<'daily' | 'weekly'>('daily');
  
  // Task input states
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('Revision');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, category, priority, dueDate);
    setTitle('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-sans">
      {/* Col 1: Task Entry & Habits Streaks */}
      <div className="space-y-6">
        {/* Add new Task */}
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-brand-blue" /> Add Action Item
          </h3>
          <form onSubmit={handleAddTask} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase">Task Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Read academic paper, write code..."
                className="w-full glass-input px-3 py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full glass-input px-2 py-2 text-xs bg-slate-900 border-slate-800"
                >
                  <option value="Revision">Revision</option>
                  <option value="Project">Project</option>
                  <option value="Homework">Homework</option>
                  <option value="Placement">Placement</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase">Priority</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full glass-input px-2 py-2 text-xs bg-slate-900 border-slate-800"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full glass-input px-3 py-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue/80 text-[#030014] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add to Planner
            </button>
          </form>
        </div>

        {/* Habits quick check */}
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
          <h3 className="text-sm font-bold text-white font-display">Streaks Tracker</h3>
          <div className="space-y-2">
            {habits.map(h => (
              <div key={h.id} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                <div>
                  <p className="text-xs font-semibold text-slate-300">{h.name}</p>
                  <p className="text-[10px] text-amber-500 font-medium">🔥 {h.streak} Days active</p>
                </div>
                <button
                  onClick={() => toggleHabit(h.id)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer
                    ${h.completedToday 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'}`}
                >
                  {h.completedToday ? 'Done' : 'Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Col 2 & 3: Interactive Planner Schedule */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-850 pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setPlannerTab('daily')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer
                  ${plannerTab === 'daily' 
                    ? 'bg-brand-blue text-[#030014]' 
                    : 'text-slate-400 hover:text-white'}`}
              >
                Daily Schedule
              </button>
              <button
                onClick={() => setPlannerTab('weekly')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer
                  ${plannerTab === 'weekly' 
                    ? 'bg-brand-blue text-[#030014]' 
                    : 'text-slate-400 hover:text-white'}`}
              >
                Weekly Targets
              </button>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Auto Sync: Active</span>
          </div>

          {/* Daily tab content */}
          {plannerTab === 'daily' ? (
            <div className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-8">Your calendar schedule is clear!</p>
              ) : (
                tasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3.5 rounded-2xl bg-white/[0.01] border border-white/[0.03] flex items-center justify-between gap-4 hover:border-slate-800 transition"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 border-slate-800 text-brand-blue bg-transparent rounded focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <p className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.title}</p>
                        <span className="inline-flex items-center gap-1 text-[9px] text-slate-500 mt-1">
                          <Clock className="w-3 h-3" /> Due: {task.dueDate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-full
                        ${task.priority === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                          task.priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {task.priority}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-650 hover:text-rose-400 transition cursor-pointer"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Weekly targets view */
            <div className="space-y-4">
              {[
                { day: 'Monday', label: 'Revise Maths Integration topics, finish course chapter 2' },
                { day: 'Wednesday', label: 'Draft personal portfolio projects content' },
                { day: 'Friday', label: 'Solve placement mock practice question sets' }
              ].map((wk, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] space-y-2">
                  <span className="text-[10px] text-brand-purple font-bold uppercase tracking-wider">{wk.day}</span>
                  <p className="text-xs text-slate-300">{wk.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

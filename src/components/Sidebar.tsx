import React from 'react';
import {
  LayoutDashboard, Compass, Layers, School, Award, BookOpen,
  Calendar, FileCode, FileText, UserSquare2, Briefcase,
  LogOut, ShieldAlert, Sparkles, X, Bell, Brain, Target,
  Trophy, Code2, MapPin, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuSections = [
  {
    title: 'My Dashboard',
    items: [
      { id: 'student-dashboard', name: 'Overview', icon: LayoutDashboard },
      { id: 'student-profile', name: 'My Profile', icon: UserSquare2 },
      { id: 'notifications', name: 'Notifications', icon: Bell },
    ]
  },
  {
    title: 'AI Intelligence',
    items: [
      { id: 'assessment', name: 'Skill Assessment', icon: Sparkles },
      { id: 'learning-persona-page', name: 'Learning Persona', icon: Brain },
      { id: 'career-prediction', name: 'Career Prediction', icon: Target },
    ]
  },
  {
    title: 'Explore & Discover',
    items: [
      { id: 'stream-explorer', name: 'Stream Explorer', icon: Layers },
      { id: 'career-explorer', name: 'Career Explorer', icon: Compass },
      { id: 'college-explorer', name: 'College Explorer', icon: School },
      { id: 'scholarship-hub', name: 'Scholarship Hub', icon: Award },
    ]
  },
  {
    title: 'Learn & Build',
    items: [
      { id: 'learning-hub', name: 'Learning Hub', icon: BookOpen },
      { id: 'study-planner', name: 'Study Planner', icon: Calendar },
      { id: 'project-explorer', name: 'Project Explorer', icon: Code2 },
    ]
  },
  {
    title: 'Career & Jobs',
    items: [
      { id: 'resume-portfolio', name: 'Resume Builder', icon: FileText },
      { id: 'placement-hub', name: 'Interview Prep', icon: Trophy },
      { id: 'job-tracker', name: 'Job Tracker', icon: Briefcase },
    ]
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72
        border-r border-slate-800/50 bg-[#0a0d13]
        transition-transform duration-300 lg:translate-x-0 lg:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white font-display">EduVerse <span className="text-indigo-400">AI</span></span>
              <p className="text-[9px] text-slate-500 font-sans tracking-widest uppercase font-bold">Career Platform</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="px-4 py-4 border-b border-slate-800/50 shrink-0">
          <div className="relative flex items-center gap-3 p-3.5 rounded-2xl bg-[#131320]/80 border border-indigo-500/20 overflow-hidden group hover:border-indigo-500/40 transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/20 shrink-0">
              <div className="w-full h-full bg-[#0a0a16] rounded-[10px] flex items-center justify-center font-black text-white text-base">
                {user?.name ? user.name[0] : 'R'}
              </div>
            </div>

            <div className="overflow-hidden flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-white truncate group-hover:text-indigo-300 transition-colors">{user?.name || 'Ravi'}</p>
                <span className="shrink-0 px-1.5 py-0.5 rounded-[4px] bg-gradient-to-r from-indigo-600 to-purple-600 text-[8px] font-black tracking-widest text-white shadow-sm uppercase">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 capitalize mt-0.5 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)] animate-pulse" />
                {user?.role || 'Student'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-800">
          {menuSections.map(section => (
            <div key={section.title}>
              {/* Section Header */}
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">{section.title}</p>
              <div className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`
                        flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative overflow-hidden
                        ${isActive
                          ? 'bg-indigo-500/10 text-white'
                          : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'}
                      `}
                    >
                      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                      <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Admin Panel if applicable */}
          {user?.role === 'Admin' && (
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-3 mb-2">Administration</p>
              <button
                onClick={() => handleNavClick('admin-panel')}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-rose-400 hover:bg-rose-500/5`}
              >
                <ShieldAlert className="w-4.5 h-4.5 shrink-0" />
                <span>Admin Panel</span>
              </button>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/50 shrink-0">
          <button
            onClick={() => { logout(); window.location.reload(); }}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

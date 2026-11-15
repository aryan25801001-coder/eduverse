import React, { useState } from 'react';
import { Bell, Menu, CheckCircle2, Award, Briefcase, ChevronDown, Globe, Settings, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TopNavbarProps {
  activeTab: string;
  onMenuClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ activeTab, onMenuClick }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTitle = (tab: string) => {
    return tab
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const notificationList = [
    {
      id: 1,
      type: 'achievement',
      text: 'Congratulations! You unlocked the "Calculus Master" badge.',
      time: '2 hours ago',
      icon: Award,
      color: 'text-amber-400 bg-amber-400/10'
    },
    {
      id: 2,
      type: 'task',
      text: 'Reminder: "LeetCode arrays practice" is due tomorrow.',
      time: '4 hours ago',
      icon: CheckCircle2,
      color: 'text-brand-blue bg-brand-blue/10'
    },
    {
      id: 3,
      type: 'job',
      text: 'FutureLabs AI updated your internship status to "Interview Scheduling".',
      time: '1 day ago',
      icon: Briefcase,
      color: 'text-purple-400 bg-purple-400/10'
    }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 lg:px-8 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/60 backdrop-blur-md">
      {/* Left section: mobile hamburger & Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-400 hover:bg-white/[0.04] hover:text-white lg:hidden border border-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white font-display">
            {formatTitle(activeTab)}
          </h1>
        </div>
      </div>

      {/* Right section: Profile & Notification icon */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-400 hover:text-white bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-slate-700 transition"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-blue rounded-full" />
          </button>

          {showNotifications && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              {/* Panel */}
              <div className="absolute right-0 mt-3 w-80 lg:w-96 z-50 glass-card rounded-2xl overflow-hidden p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <button className="text-xs text-brand-blue hover:underline">Mark all as read</button>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {notificationList.map(notif => {
                    const Icon = notif.icon;
                    return (
                      <div key={notif.id} className="flex gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${notif.color}`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-300 leading-relaxed">{notif.text}</p>
                          <span className="text-[10px] text-slate-500 block mt-1">{notif.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Info Summary */}
        <div className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-slate-600 transition text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-sm">
              {user?.name ? user.name[0] : 'R'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-200">{user?.name || 'Ravi'}</p>
              <p className="text-[9px] text-slate-500">Student ID: #7829</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 ml-1 hidden sm:block transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 z-50 glass-card rounded-2xl overflow-hidden p-2 space-y-1 shadow-2xl border border-slate-700/60 bg-[#0f111a]/95 backdrop-blur-xl">
                <div className="px-3 py-2 border-b border-slate-800/60 mb-1">
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-white truncate">{user?.email || 'student@eduverse.ai'}</p>
                </div>
                
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition">
                  <UserIcon className="w-4 h-4" />
                  My Profile
                </button>

                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <p className="text-xs text-slate-400">Language</p>
                  </div>
                  <select className="w-full bg-[#16102b] border border-slate-700 text-slate-300 text-sm rounded-lg px-2 py-1.5 outline-none focus:border-brand-blue cursor-pointer">
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="border-t border-slate-800/60 my-1 pt-1">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition">
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
    </header>
  );
};

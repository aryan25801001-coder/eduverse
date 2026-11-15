import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <header className="h-20 glass-panel border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-display font-semibold tracking-wide">
          Welcome back, Admin
        </h2>
        <span className="px-3 py-1 text-xs font-medium bg-brand-blue/10 text-brand-blue rounded-full border border-brand-blue/20">
          Live Status
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search vehicles..." 
            className="glass-input pl-10 pr-4 py-2 w-64 text-sm"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell size={20} className="text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#030014]"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium">Alex Johnson</div>
            <div className="text-xs text-gray-400">Manager</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center p-[2px]">
            <div className="w-full h-full bg-[#030014] rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

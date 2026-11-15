import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Map, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/layout', label: 'Parking Layout', icon: Map },
  { path: '/vehicles', label: 'Vehicles', icon: Car },
];

export const Sidebar = () => {
  return (
    <div className="h-screen w-64 glass-panel border-r border-white/10 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <h1 className="text-2xl font-display font-bold text-gradient tracking-wide flex items-center gap-2">
          <Car className="text-[#00f2fe]" size={28} />
          ParkSmart
        </h1>
      </div>

      <nav className="flex-1 px-4 mt-8 flex flex-col gap-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 text-white border border-[#00f2fe]/30 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-[#00f2fe]' : ''} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -left-4 w-1 h-8 bg-[#00f2fe] rounded-r-md"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-1">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

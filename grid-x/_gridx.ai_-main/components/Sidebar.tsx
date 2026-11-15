"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { BiLeaf, BiPowerOff, BiGridAlt, BiHistory, BiTrophy, BiBarChartAlt2, BiServer, BiRefresh, BiNetworkChart } from "react-icons/bi";
import { FiTrendingUp, FiZap, FiActivity, FiCpu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { setDisasterMode, isDisasterMode, user, activeView, setActiveView, carbonWallet } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="w-[300px] ultra-glass-card m-6 flex flex-col h-[calc(100vh-120px)] sticky top-[100px] z-40 overflow-y-auto custom-scrollbar">
      
      {/* OS Branding / Node Status */}
      <div className="p-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <FiCpu className="text-accent text-lg relative z-10" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-lg text-white tracking-wider">GRID X <span className="text-accent text-xs">OS</span></h2>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.3em] font-sans">Node Active</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 p-4 flex-1">
        <NavItem
          icon={<BiGridAlt />}
          label="Dashboard"
          active={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        />
        <NavItem
          icon={<FiZap />}
          label="Energy Market"
          active={activeView === 'market'}
          onClick={() => setActiveView('market')}
        />
        <NavItem
          icon={<BiHistory />}
          label="Trades History"
          active={activeView === 'history'}
          onClick={() => setActiveView('history')}
        />
        <NavItem
          icon={<BiTrophy />}
          label="Carbon Heroes"
          active={activeView === 'leaderboard'}
          onClick={() => setActiveView('leaderboard')}
        />
        <NavItem
          icon={<BiBarChartAlt2 />}
          label="Advanced Analytics"
          active={activeView === 'analytics'}
          onClick={() => setActiveView('analytics')}
        />
        <div className="py-2 opacity-20 border-b border-white/10 mx-4" />
        <NavItem
          icon={<BiServer />}
          label="GridX Operations"
          active={activeView === 'operations'}
          onClick={() => setActiveView('operations')}
        />
        <NavItem
          icon={<BiRefresh />}
          label="Sync Grid"
          active={activeView === 'sync-grid'}
          onClick={() => setActiveView('sync-grid')}
        />
        <NavItem
          icon={<BiNetworkChart />}
          label="Grid Stability"
          active={activeView === 'grid-stability'}
          onClick={() => setActiveView('grid-stability')}
        />
        <NavItem
          icon={<FiActivity />}
          label="Smart Meters"
          active={activeView === 'meters'}
          onClick={() => setActiveView('meters')}
        />
      </nav>

      <div className="space-y-4 p-4 mt-auto border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent">
        {/* Disaster Mode Toggle */}
        <button
          onClick={() => setDisasterMode(!isDisasterMode)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all relative overflow-hidden group ${isDisasterMode
            ? "bg-neon-red/10 border border-neon-red/50 text-neon-red shadow-[0_0_30px_rgba(255,61,110,0.2)]"
            : "bg-white/5 border border-white/5 text-gray-500 hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
            }`}
        >
          <div className="flex items-center gap-3 relative z-10">
            <BiPowerOff className={`w-5 h-5 ${isDisasterMode ? "animate-pulse" : ""}`} />
            <span className="text-[10px] font-orbitron font-bold uppercase tracking-[0.2em]">
              {isDisasterMode ? "System Isolated" : "Disaster Protocol"}
            </span>
          </div>
          <div className={`w-1.5 h-1.5 rounded-full relative z-10 ${isDisasterMode ? "bg-neon-red shadow-[0_0_12px_rgba(255,61,110,1)]" : "bg-white/10"}`}></div>
        </button>

        {/* User Mini Profile */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-accent/20 transition-all duration-500 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-black font-black text-sm shadow-[0_0_15px_rgba(0,255,178,0.3)] group-hover:scale-110 transition-transform">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-orbitron font-bold text-gray-100 truncate tracking-tight">{user?.name || "Arjun Solar Farm"}</p>
            <p className="text-[9px] text-accent font-sans uppercase font-bold tracking-widest">{user?.role || "SELLER"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 relative group truncate ${active
        ? "bg-accent/10 text-accent shadow-[inset_0_0_20px_rgba(0,255,178,0.05)] border border-accent/20"
        : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
        }`}
    >
      <span className={`text-xl transition-all duration-500 group-hover:scale-110 ${active ? "text-accent drop-shadow-[0_0_12px_rgba(0,255,178,0.8)]" : "text-gray-600 group-hover:text-gray-400"}`}>
        {icon}
      </span>
      <span className={`text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-colors ${active ? "neon-text-green" : "group-hover:text-gray-300"}`}>{label}</span>

      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full shadow-[0_0_15px_rgba(0,255,178,1)]"
        />
      )}
    </button>
  );
}

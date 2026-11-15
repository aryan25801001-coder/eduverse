"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { FiSun, FiZap, FiSettings, FiBell, FiShield, FiServer, FiRadio } from "react-icons/fi";
import { BiLeaf, BiNetworkChart, BiChevronDown, BiChip } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Header() {
  const { user, isDisasterMode, clearUser } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`h-24 sticky top-0 z-50 transition-all duration-700 ${scrolled
          ? "bg-[#02030A]/90 backdrop-blur-3xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-white/5"
        }`}
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1800px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4 group cursor-pointer relative">
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-700 transform group-hover:rotate-[360deg] ${isDisasterMode ? "bg-[#FF3D6E]/10 border border-[#FF3D6E]/30 text-[#FF3D6E] shadow-[0_0_20px_rgba(255,61,110,0.3)]" : "bg-[#00FFB2]/10 border border-[#00FFB2]/30 text-[#00FFB2] shadow-[0_0_20px_rgba(0,255,178,0.3)]"
              }`}>
              <FiSun className={`w-6 h-6 ${isDisasterMode ? "animate-pulse" : ""}`} />
              <div className="absolute inset-0 bg-current blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
            </div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold tracking-widest flex items-center gap-2">
                <span className="text-white">GRID</span>
                <span className={isDisasterMode ? "text-[#FF3D6E] text-shadow-glow" : "text-[#00FFB2] text-shadow-glow"}>X</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isDisasterMode ? "bg-[#FF3D6E] animate-ping" : "bg-[#00FFB2] shadow-[0_0_8px_rgba(0,255,178,1)]"}`}></div>
                <p className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-[0.3em]">
                  {isDisasterMode ? "Protocol Delta Active" : "Network v2.04 Secure"}
                </p>
              </div>
            </div>
          </div>
 
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
            <HeaderTab label="Mainnet" icon={<FiServer />} active />
            <HeaderTab label="Mumbai" icon={<FiRadio />} />
            <HeaderTab label="AI Node" icon={<BiChip />} />
          </nav>
        </div>
 
        {/* Global Stats bar (Middle) */}
        <div className="hidden xl:flex items-center gap-12 border-x border-white/5 px-12 h-12 bg-white/5 rounded-2xl backdrop-blur-md">
          <StatItem label="Global Vol." value="14.8 GWh" />
          <StatItem label="Nodes Act." value="1,248" color="text-[#3BA5FF]" />
          <StatItem label="Grid Health" value="99.9%" color="text-[#00FFB2]" />
        </div>
 
        {/* Action Controls */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <HeaderActionButton icon={<FiBell />} badgeCount={3} />
            <HeaderActionButton icon={<FiSettings />} />
          </div>
 
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
 
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-4 pl-4 pr-2 py-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group"
            >
              <div className="text-right hidden md:block">
                <p className="text-xs font-orbitron font-bold text-gray-100 group-hover:text-[#00FFB2] transition-colors">{user?.name || "Arjun Solar Farm"}</p>
                <div className="flex items-center justify-end gap-1.5 mt-0.5">
                  <FiShield className="text-[9px] text-[#00FFB2]" />
                  <p className="text-[9px] text-gray-500 font-sans font-bold uppercase tracking-widest">{user?.role || "Operator"}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00FFB2] to-[#3BA5FF] flex items-center justify-center text-black font-orbitron font-bold text-sm relative shadow-[0_0_20px_rgba(0,255,178,0.4)] group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0) || "A"}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#02030A] flex items-center justify-center border border-white/10 group-hover:border-[#00FFB2] transition-colors">
                  <BiChevronDown className="text-gray-500 group-hover:text-[#00FFB2] transition-colors" />
                </div>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-[#081124] border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 backdrop-blur-xl">
                <button
                  onClick={() => {
                    clearUser();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-xs font-orbitron font-bold text-[#FF3D6E] hover:bg-[#FF3D6E]/10 border border-transparent hover:border-[#FF3D6E]/30 transition-colors flex items-center gap-2"
                >
                  <BiPowerOff /> Shutdown Node
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function StatItem({ label, value, color = "text-gray-200" }: { label: string; value: string; color?: string }) {
  return (
    <div className="text-center group cursor-default relative">
      <p className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-[0.3em] leading-none mb-1.5 group-hover:text-gray-400 transition-colors">{label}</p>
      <p className={`text-sm font-orbitron font-bold transition-all duration-300 ${color} group-hover:scale-110 tracking-widest group-hover:text-shadow-glow`}>{value}</p>
    </div>
  );
}

function HeaderTab({ label, icon, active = false }: { label: string; icon?: React.ReactNode; active?: boolean }) {
  return (
    <button className={`px-5 py-2.5 rounded-xl text-[9px] font-sans font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2.5 ${active ? "bg-[rgba(0,255,178,0.1)] text-[#00FFB2] border border-[#00FFB2]/20 shadow-[inset_0_0_15px_rgba(0,255,178,0.1)]" : "text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent"
      }`}>
      {icon && <span className={`text-base ${active ? "text-[#00FFB2]" : "text-gray-500"}`}>{icon}</span>}
      {label}
    </button>
  );
}

function HeaderActionButton({ icon, badgeCount }: { icon: React.ReactNode; badgeCount?: number }) {
  return (
    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-[#00FFB2] hover:border-[#00FFB2]/30 hover:bg-[#00FFB2]/5 transition-all relative group shadow-inner">
      <span className="text-xl transition-all duration-300 group-hover:scale-110">{icon}</span>
      {badgeCount && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3D6E] text-[9px] font-sans font-bold text-white rounded-lg flex items-center justify-center border-2 border-[#02030A] shadow-[0_0_15px_rgba(255,61,110,0.5)]">
          {badgeCount}
        </span>
      )}
    </button>
  );
}

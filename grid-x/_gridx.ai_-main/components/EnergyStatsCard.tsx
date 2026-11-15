"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
}

export default function EnergyStatsCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  color = "neon-green",
}: Props) {
  const isUp = trend === "up";

  const getStyleClasses = () => {
    switch (color) {
      case 'neon-green':
      case 'accent':
        return {
          glow: 'bg-[rgba(0,255,178,0.15)]',
          text: 'group-hover:text-[#00FFB2]',
          iconText: 'text-[#00FFB2]',
          line: 'via-[#00FFB2]/50',
          iconBg: 'group-hover:bg-[#00FFB2]/10 group-hover:border-[#00FFB2]/30',
          trendBg: 'bg-[#00FFB2]/10 text-[#00FFB2]',
        };
      case 'neon-yellow':
        return {
          glow: 'bg-[rgba(231,255,67,0.15)]',
          text: 'group-hover:text-[#E7FF43]',
          iconText: 'text-[#E7FF43]',
          line: 'via-[#E7FF43]/50',
          iconBg: 'group-hover:bg-[#E7FF43]/10 group-hover:border-[#E7FF43]/30',
          trendBg: 'bg-[#E7FF43]/10 text-[#E7FF43]',
        };
      case 'electric-blue':
      case 'neon-cyan':
        return {
          glow: 'bg-[rgba(59,165,255,0.15)]',
          text: 'group-hover:text-[#3BA5FF]',
          iconText: 'text-[#3BA5FF]',
          line: 'via-[#3BA5FF]/50',
          iconBg: 'group-hover:bg-[#3BA5FF]/10 group-hover:border-[#3BA5FF]/30',
          trendBg: 'bg-[#3BA5FF]/10 text-[#3BA5FF]',
        };
      case 'neon-red':
        return {
          glow: 'bg-[rgba(255,61,110,0.15)]',
          text: 'group-hover:text-[#FF3D6E]',
          iconText: 'text-[#FF3D6E]',
          line: 'via-[#FF3D6E]/50',
          iconBg: 'group-hover:bg-[#FF3D6E]/10 group-hover:border-[#FF3D6E]/30',
          trendBg: 'bg-[#FF3D6E]/10 text-[#FF3D6E]',
        };
      default:
        return {
          glow: 'bg-[rgba(0,255,178,0.15)]',
          text: 'group-hover:text-[#00FFB2]',
          iconText: 'text-[#00FFB2]',
          line: 'via-[#00FFB2]/50',
          iconBg: 'group-hover:bg-[#00FFB2]/10 group-hover:border-[#00FFB2]/30',
          trendBg: 'bg-[#00FFB2]/10 text-[#00FFB2]',
        };
    }
  };

  const styles = getStyleClasses();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`ultra-glass-card p-6 relative group overflow-hidden`}
    >
      {/* Light Sweep Animation Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)] -translate-x-full group-hover:animate-light-sweep pointer-events-none" />

      {/* Dynamic Background Glow */}
      <div 
        className={`absolute -right-4 -top-4 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${styles.glow}`}
      />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 shadow-inner ${styles.iconBg} ${styles.iconText}`}>
          <div className="text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
            {icon}
          </div>
        </div>

        {trendValue && (
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-sans font-bold tracking-widest uppercase ${styles.trendBg}`}>
            <span>{isUp ? "↑" : "↓"}</span>
            <span className="font-orbitron">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${styles.glow.replace('bg-[rgba(', 'bg-[').replace('0.15)]', '1)]')}`} style={{ background: 'currentColor' }} />
           <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-[0.2em]">{title}</p>
        </div>
        
        <div className="flex items-baseline gap-2 pt-1">
          <h2 className={`text-3xl font-orbitron font-bold text-white tracking-wider transition-colors ${styles.text}`}>
            {value}
          </h2>
          <span className="text-xs font-sans font-bold text-gray-500 uppercase tracking-widest">{unit}</span>
        </div>
      </div>

      {/* Futuristic Progress Line Decoration */}
      <div className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent ${styles.line} to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out`} />
      <div className={`absolute top-0 right-0 w-[3px] bg-gradient-to-b from-transparent ${styles.line} to-transparent h-0 group-hover:h-full transition-all duration-700 ease-out delay-100`} />
    </motion.div>
  );
}

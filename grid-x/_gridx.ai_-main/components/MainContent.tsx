"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { api } from "@/lib/api";
import EnergyStatsCard from "./EnergyStatsCard";
import CarbonCounter from "./CarbonCounter";
import EnergyMarket from "./EnergyMarket";
import TradeHistory from "./TradeHistory";
import CarbonLeaderboard from "./CarbonLeaderboard";
import SolarChart from "./SolarChart";
import BuySell from "./BuySell";
import GridXOperations from "./GridXOperations";
import SyncGrid from "./SyncGrid";
import GridStabilityDashboard from "./GridStabilityDashboard";
import MeterDashboard from "./MeterDashboard";
import { FiRefreshCw, FiZap, FiSun, FiTrendingUp, FiActivity, FiCpu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function MainContent() {
  const { activeView, setActiveView, selectedHouseId, houses } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const selectedHouse = houses.find((h) => h.id === selectedHouseId) || houses[0];

  useEffect(() => {
    if (activeView === 'analytics') {
      loadAiInsights();
    }
  }, [activeView]);

  const loadAiInsights = async () => {
    setAnalyticsLoading(true);
    try {
      const forecast = await api.getForecast();
      setAiInsights(forecast.data);
    } catch (error) {
      console.error('Failed to load AI insights:', error);
      setAiInsights({
        predictedDemand: 3.2,
        confidence: 0.92,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800 - Math.random() * 400));
    } finally {
      setRefreshing(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "market":
        return <EnergyMarket selectedHouse={selectedHouse} />;
      case "history":
        return <TradeHistory />;
      case "leaderboard":
        return <CarbonLeaderboard />;
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-orbitron font-bold text-gray-100 uppercase tracking-widest flex items-center gap-3">
              <FiActivity className="text-[#3BA5FF]" />
              Advanced Grid Analytics
            </h2>
            {analyticsLoading ? (
              <div className="ultra-glass-card border-[#3BA5FF]/10 rounded-3xl p-8 h-[500px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#3BA5FF]/5 animate-pulse" />
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 border-4 border-[#3BA5FF] border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_15px_rgba(59,165,255,0.5)]"></div>
                  <p className="text-[#3BA5FF] font-orbitron font-bold uppercase tracking-widest">Initializing AI Models...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 ultra-glass-card p-8 border-[#00FFB2]/20">
                  <h3 className="text-sm font-orbitron font-bold text-[#00FFB2] mb-6 uppercase tracking-widest flex items-center gap-2">
                    <FiCpu className="animate-pulse" /> Deep Neural Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="p-6 bg-[#00FFB2]/5 border border-[#00FFB2]/10 rounded-2xl relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFB2]/10 to-transparent -translate-x-full group-hover:animate-light-sweep" />
                      <p className="text-[10px] font-sans font-bold text-[#00FFB2]/60 uppercase mb-2 tracking-widest">Predicted Demand</p>
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-orbitron font-bold text-[#00FFB2] text-shadow-glow">{aiInsights?.predictedDemand?.toFixed(2) || '3.42'}</span>
                        <span className="text-sm text-gray-500 mb-2 font-sans font-bold uppercase">kWh</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-sans font-bold text-gray-500 uppercase mb-2 tracking-widest">Confidence Level</p>
                        <p className="text-3xl font-orbitron font-bold text-[#3BA5FF]">{((aiInsights?.confidence || 0.98) * 100).toFixed(1)}%</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-sans font-bold text-gray-500 uppercase mb-2 tracking-widest">Grid Status</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="w-3 h-3 rounded-full bg-[#00FFB2] animate-pulse shadow-[0_0_12px_rgba(0,255,178,1)]"></div>
                          <p className="text-xl font-orbitron font-bold text-[#00FFB2]">OPTIMAL</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ultra-glass-card p-8 border-[#E7FF43]/20">
                  <h3 className="text-xs font-orbitron font-bold text-gray-400 mb-6 uppercase tracking-widest">AI Market Timing</h3>
                  <div className="space-y-4 relative z-10">
                    <div className="p-5 bg-[#E7FF43]/5 border border-[#E7FF43]/10 rounded-2xl">
                      <p className="text-[9px] font-sans font-bold text-[#E7FF43]/80 mb-2 uppercase tracking-widest">Supply Strategy</p>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">Maintain current output. Demand spike predicted in <span className="text-[#E7FF43] font-bold">14 minutes</span>.</p>
                    </div>
                    <div className="p-5 bg-[#3BA5FF]/5 border border-[#3BA5FF]/10 rounded-2xl">
                      <p className="text-[9px] font-sans font-bold text-[#3BA5FF]/80 mb-2 uppercase tracking-widest">Trading Recommendation</p>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">Sell surplus now. Current price is at <span className="text-[#3BA5FF] font-bold">peak for the hour</span>.</p>
                    </div>
                    <button
                      onClick={() => setActiveView('market')}
                      className="btn-cyber w-full mt-4"
                    >
                      Maximize Profits
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "operations":
        return <GridXOperations />;
      case "sync-grid":
        return <SyncGrid />;
      case "grid-stability":
        return <GridStabilityDashboard />;
      case "meters":
        return <MeterDashboard />;
      case "dashboard":
      default:
        return (
          <div className="space-y-8 relative">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <EnergyStatsCard
                title="Live Generation"
                value="4.28"
                unit="kW"
                icon={<FiSun className="text-[#E7FF43]" />}
                trend="up"
                trendValue="12%"
                color="neon-yellow"
              />
              <EnergyStatsCard
                title="Surplus Energy"
                value="2.81"
                unit="kW"
                icon={<FiZap className="text-[#00FFB2]" />}
                color="neon-green"
              />
              <EnergyStatsCard
                title="AI Optimized Price"
                value="₹5.20"
                unit="kWh"
                icon={<FiTrendingUp className="text-[#3BA5FF]" />}
                color="electric-blue"
                trend="down"
                trendValue="3%"
              />
              <CarbonCounter />
            </div>

            {/* Buy & Sell Section */}
            <BuySell />

            {/* Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SolarChart />
              </div>
              <div className="ultra-glass-card p-8 border-[#E7FF43]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all duration-700">
                  <FiZap className="w-40 h-40 text-[#E7FF43] group-hover:scale-110 rotate-12 blur-[2px]" />
                </div>
                <h3 className="text-[9px] font-sans font-bold text-[#E7FF43] mb-8 uppercase tracking-[0.3em]">Market Intelligence Node</h3>
                <div className="space-y-6 relative z-10">
                  <div className="p-6 bg-[#E7FF43]/5 border border-[#E7FF43]/10 rounded-2xl group-hover:border-[#E7FF43]/20 transition-colors">
                    <p className="text-sm font-orbitron font-bold text-white mb-3">Peak Demand Prediction</p>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      Demand spike expected at <span className="text-[#E7FF43] font-bold">18:45</span>.
                      AI recommends <span className="text-[#00FFB2] font-bold">maximizing storage</span> now for future arbitrage.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-2">
                    <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse shadow-[0_0_10px_rgba(0,255,178,1)]" />
                    <p className="text-xs text-gray-400 leading-relaxed font-sans">
                      Grid stability is high. Dynamic pricing floor rate reached.
                      <span className="text-[#00FFB2] ml-2 font-orbitron font-bold uppercase tracking-widest block mt-2">Ideal Buy Window</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveView('market')}
                    className="btn-cyber w-full mt-4"
                  >
                    Open Trading Terminal
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity Mini-Table or Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="ultra-glass-card border-[#00FFB2]/20 p-8">
                <h3 className="text-[9px] font-sans font-bold text-[#00FFB2] mb-6 uppercase tracking-[0.3em]">Global Carbon Impact</h3>
                <div className="flex items-center gap-8">
                  <div className="text-5xl font-orbitron font-bold text-[#00FFB2] text-shadow-glow tracking-wider">1.24 <span className="text-sm font-sans text-gray-400">Metric Tons</span></div>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      className="h-full bg-[#00FFB2] shadow-[0_0_10px_rgba(0,255,178,1)]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-6 uppercase font-sans font-bold tracking-widest">GridX community total CO₂ offset since launch</p>
              </div>
              <div className="ultra-glass-card border-[#3BA5FF]/20 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-[9px] font-sans font-bold text-[#3BA5FF] mb-6 uppercase tracking-[0.3em]">Active Smart Contracts</h3>
                  <div className="flex gap-3 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#3BA5FF] shadow-[0_0_12px_rgba(59,165,255,1)] animate-pulse"></div>
                    <span className="text-[10px] text-gray-300 font-sans font-bold uppercase tracking-widest">Mainnet Bridge Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-4xl font-orbitron font-bold text-white tracking-wider">842</p>
                    <p className="text-[9px] text-gray-500 font-sans font-bold uppercase mt-2 tracking-widest">Total Transactions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-orbitron font-bold text-[#3BA5FF] text-shadow-glow tracking-wider">0.001</p>
                    <p className="text-[9px] text-gray-500 font-sans font-bold uppercase mt-2 tracking-widest">Avg. Gas (MATIC)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 p-8 lg:p-12 overflow-y-auto custom-scrollbar h-[calc(100vh-100px)]">
      <div className="max-w-[1400px] mx-auto space-y-10">
        {/* View Header */}
        <div className="flex items-center justify-between">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-[10px] font-sans font-bold text-[#00FFB2] uppercase tracking-[0.4em] mb-2">GridX Operations</p>
            <h1 className="text-4xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-4">
              {activeView === 'dashboard' ? 'Overview' :
                activeView === 'market' ? 'Energy Market' :
                  activeView === 'history' ? 'Transaction Ledger' :
                    activeView === 'leaderboard' ? 'Carbon Heroes' : 'Analytics'}
            </h1>
          </motion.div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:border-[#00FFB2]/50 hover:bg-[#00FFB2]/10 hover:shadow-[0_0_20px_rgba(0,255,178,0.2)] transition-all disabled:opacity-50 group"
          >
            <FiRefreshCw className={`${refreshing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"} text-[#00FFB2] text-lg`} />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-white">Sync Grid</span>
          </button>
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

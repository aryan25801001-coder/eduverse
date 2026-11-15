"use client";

import React, { useState } from "react";
import { FiZap, FiArrowRight, FiCheckCircle, FiUploadCloud } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function BuySell() {
  const [amount, setAmount] = useState(5);
  const [buyingStatus, setBuyingStatus] = useState(false);
  const [sellingStatus, setSellingStatus] = useState(false);
  const price = 5.20;
  const total = amount * price;

  const handleCompletePurchase = () => {
    setBuyingStatus(true);
    setTimeout(() => {
      setBuyingStatus(false);
      setAmount(5);
    }, 2000);
  };

  const handleListForSale = () => {
    setSellingStatus(true);
    setTimeout(() => {
      setSellingStatus(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* BUY Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="ultra-glass-card p-10 relative group border-[#00FFB2]/20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)] -translate-x-full group-hover:animate-light-sweep pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00FFB2]/10 rounded-full blur-[50px] group-hover:bg-[#00FFB2]/20 transition-all duration-700 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-[inset_0_0_15px_rgba(0,255,178,0.1)] group-hover:border-[#00FFB2]/30 transition-colors">
              <FiZap className="text-[#00FFB2] text-3xl animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider">Energy Acquisition</h3>
              <p className="text-[10px] text-[#00FFB2]/80 font-sans font-bold uppercase tracking-[0.3em]">Purchase Clean Quotas</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-widest">Amount to Purchase</p>
                <p className="text-3xl font-orbitron font-bold text-white">{amount} <span className="text-xs text-gray-500 font-sans font-bold uppercase tracking-widest">kWh</span></p>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-[#00FFB2] to-[#3BA5FF]"
                     style={{ width: `${(amount / 20) * 100}%` }}
                   />
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="w-full h-1.5 opacity-0 cursor-pointer absolute top-1/2 -translate-y-1/2 z-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-[9px] font-sans font-bold text-gray-500 uppercase mb-2 tracking-widest">Current Rate</p>
                <p className="text-xl font-orbitron font-bold text-[#3BA5FF] tracking-wider">₹{price.toFixed(2)}<span className="text-[10px] text-gray-500 ml-1 font-sans">/UNIT</span></p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFB2]/5 to-transparent pointer-events-none" />
                <p className="text-[9px] font-sans font-bold text-[#00FFB2]/80 uppercase mb-2 tracking-widest">Calculated Cost</p>
                <p className="text-xl font-orbitron font-bold text-[#00FFB2] tracking-wider">₹{total.toFixed(2)}</p>
              </div>
            </div>

            <button
              disabled={buyingStatus}
              onClick={handleCompletePurchase}
              className={`w-full py-5 rounded-2xl font-orbitron font-bold transition-all duration-500 uppercase text-xs tracking-[.3em] flex items-center justify-center gap-3 active:scale-95 ${buyingStatus
                ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-[linear-gradient(135deg,#00FFB2_0%,#3BA5FF_100%)] text-black hover:shadow-[0_0_30px_rgba(0,255,178,0.5)] border border-[#00FFB2]/30 hover:brightness-110"
                }`}
            >
              <AnimatePresence mode="wait">
                {buyingStatus ? (
                  <motion.div
                    key="buying"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Connecting to Grid...
                  </motion.div>
                ) : (
                  <motion.div
                    key="buy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <FiCheckCircle className="text-xl" />
                    Confirm Procurement
                    <FiArrowRight />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>

      {/* SELL Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="ultra-glass-card p-10 relative group border-[#E7FF43]/20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)] -translate-x-full group-hover:animate-light-sweep pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E7FF43]/10 rounded-full blur-[50px] group-hover:bg-[#E7FF43]/20 transition-all duration-700 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 shadow-[inset_0_0_15px_rgba(231,255,67,0.1)] group-hover:border-[#E7FF43]/30 transition-colors">
              <FiUploadCloud className="text-[#E7FF43] text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider">Liquidize Surplus</h3>
              <p className="text-[10px] text-[#E7FF43]/80 font-sans font-bold uppercase tracking-[0.3em]">Monetize Generation</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center group-hover:border-[#E7FF43]/20 transition-all">
              <div>
                <p className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest mb-2">Available to List</p>
                <p className="text-3xl font-orbitron font-bold text-[#E7FF43] tracking-wider">8.50 <span className="text-xs text-gray-500 font-sans">kWh</span></p>
              </div>
              <div className="h-12 w-[1px] bg-white/10" />
              <div className="text-right">
                <p className="text-[9px] font-sans font-bold text-gray-500 uppercase tracking-widest mb-2">Estimated ROI</p>
                <p className="text-xl font-orbitron font-bold text-white tracking-wider">₹44.20+</p>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-[#00FFB2]/10 to-transparent border-l-4 border-[#00FFB2] rounded-r-2xl">
              <p className="text-[9px] font-sans font-bold text-[#00FFB2] uppercase tracking-widest mb-1">AI Market Multiplier Active</p>
              <p className="text-xs text-gray-400 font-sans font-medium">Earn <span className="text-white font-bold">+4 Carbon Credits</span> per 5kW listed during peak hours.</p>
            </div>

            <button
              disabled={sellingStatus}
              onClick={handleListForSale}
              className={`w-full py-5 rounded-2xl font-orbitron font-bold transition-all duration-500 uppercase text-xs tracking-[.3em] flex items-center justify-center gap-3 active:scale-95 ${sellingStatus
                ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed"
                : "bg-white/5 border border-white/10 text-white hover:bg-[linear-gradient(135deg,rgba(231,255,67,0.2)_0%,transparent_100%)] hover:border-[#E7FF43]/50 hover:text-[#E7FF43] hover:shadow-[0_0_30px_rgba(231,255,67,0.2)]"
                }`}
            >
              <AnimatePresence mode="wait">
                {sellingStatus ? (
                  <motion.div
                    key="listing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting...
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3"
                  >
                    <FiUploadCloud className="text-xl" />
                    List for Trading
                    <FiArrowRight />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

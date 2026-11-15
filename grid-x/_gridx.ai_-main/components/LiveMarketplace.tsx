"use client";

import { useState, useEffect } from "react";
import { FiTrendingUp, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { calculateDemandMultiplier, calculateLivePrice } from "@/lib/pricing";

interface PriceTier {
  minUnits: number;
  maxUnits: number;
  basePrice: number;
  color: string;
}

export default function LiveMarketplace() {
  const priceTiers: PriceTier[] = [
    { minUnits: 0, maxUnits: 10, basePrice: 5.2, color: "text-[#00FFB2]" },      
    { minUnits: 10.1, maxUnits: 25, basePrice: 6.5, color: "text-[#E7FF43]" },  
    { minUnits: 25.1, maxUnits: 50, basePrice: 8.0, color: "text-[#3BA5FF]" },    
    { minUnits: 50.1, maxUnits: 100, basePrice: 10.5, color: "text-[#FF3D6E]" },    
  ];

  const [selectedUnits, setSelectedUnits] = useState(5);
  const [demandMultiplier, setDemandMultiplier] = useState(calculateDemandMultiplier());

  useEffect(() => {
    const updateMultiplier = () => {
      setDemandMultiplier(calculateDemandMultiplier());
    };

    updateMultiplier(); 
    const interval = setInterval(updateMultiplier, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPrice = (units: number): { price: number; tier: string; color: string } => {
    const livePrice = calculateLivePrice(demandMultiplier);
    const applicableTier = priceTiers.find(
      (tier) => units >= tier.minUnits && units <= tier.maxUnits
    ) || priceTiers[0];

    const tierMultiplier = applicableTier.basePrice / 5.2; 
    const finalPrice = parseFloat((livePrice * tierMultiplier).toFixed(2));

    let tierName = "Standard";
    if (applicableTier.basePrice === 6.5) tierName = "Premium";
    if (applicableTier.basePrice === 8.0) tierName = "High Demand";
    if (applicableTier.basePrice === 10.5) tierName = "Peak";

    return {
      price: finalPrice,
      tier: tierName,
      color: applicableTier.color,
    };
  };

  const currentPricing = getPrice(selectedUnits);
  const totalCost = (selectedUnits * currentPricing.price).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-0 right-0 mt-12 mr-2 w-80 ultra-glass-card p-6 border-[#3BA5FF]/40 shadow-[0_0_40px_rgba(59,165,255,0.15)] overflow-hidden z-50"
    >
      {/* Holographic Background effects */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3BA5FF]/20 rounded-full blur-[50px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00FFB2]/10 rounded-full blur-[50px] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-[#3BA5FF]/10 flex items-center justify-center border border-[#3BA5FF]/30 shadow-[0_0_10px_rgba(59,165,255,0.2)]">
          <FiZap className="text-[#3BA5FF] text-lg" />
        </div>
        <h3 className="text-sm font-orbitron font-bold text-[#3BA5FF] uppercase tracking-widest text-shadow-glow">
          Live Marketplace
        </h3>
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-2 h-2 rounded-full bg-[#00FFB2] ml-auto shadow-[0_0_8px_rgba(0,255,178,1)]"
        />
      </div>

      {/* Unit Selector */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-5 relative z-10 hover:border-[#3BA5FF]/20 transition-colors group">
        <p className="text-[9px] font-sans font-bold text-gray-400 uppercase mb-3 tracking-widest">
          Select Units (0-100 kWh)
        </p>
        <div className="relative mb-2">
           <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-gradient-to-r from-[#00FFB2] to-[#3BA5FF]"
                 style={{ width: `${selectedUnits}%` }}
               />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={selectedUnits}
              onChange={(e) => setSelectedUnits(parseFloat(e.target.value))}
              className="w-full h-2 opacity-0 cursor-pointer absolute top-1/2 -translate-y-1/2 z-10"
            />
        </div>
        <p className="text-xl font-orbitron font-bold text-[#3BA5FF] mt-2 group-hover:text-shadow-glow transition-all">{selectedUnits} <span className="text-xs text-gray-500 font-sans">kWh</span></p>
      </div>

      {/* Current Price */}
      <div className="space-y-3 mb-5 relative z-10 p-4 bg-white/5 border border-white/5 rounded-2xl">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-sans font-bold text-gray-400 uppercase tracking-widest">Price Tier</span>
          <span className={`text-xs font-orbitron font-bold uppercase tracking-wider ${currentPricing.color}`}>
            {currentPricing.tier}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-sans font-bold text-gray-400 uppercase tracking-widest">Base Rate</span>
          <span className="text-xs font-orbitron font-bold text-gray-300">₹{priceTiers.find(t => t.basePrice === currentPricing.price / demandMultiplier)?.basePrice.toFixed(1) || "N/A"}</span>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-sans font-bold text-[#3BA5FF] uppercase tracking-widest">Live Rate</span>
          <motion.span
            key={currentPricing.price}
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-lg font-orbitron font-bold ${currentPricing.color} text-shadow-glow`}
          >
            ₹{currentPricing.price.toFixed(2)}
          </motion.span>
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-[linear-gradient(135deg,rgba(59,165,255,0.1)_0%,transparent_100%)] rounded-2xl p-5 mb-5 border border-[#3BA5FF]/30 relative z-10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3BA5FF]/10 to-transparent -translate-x-full group-hover:animate-light-sweep" />
        <p className="text-[9px] font-sans font-bold text-[#3BA5FF]/80 uppercase mb-2 tracking-widest">Estimated Total Cost</p>
        <motion.p
          key={totalCost}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          className="text-4xl font-orbitron font-bold text-[#3BA5FF] tracking-wider text-shadow-glow"
        >
          ₹{totalCost}
        </motion.p>
      </div>

      {/* Demand Indicator */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-sans font-bold text-gray-400 uppercase flex items-center gap-1.5 tracking-widest">
            <FiTrendingUp className="text-[#E7FF43]" /> Market Demand
          </span>
          <motion.span
            key={demandMultiplier}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-xs font-orbitron font-bold text-[#E7FF43]"
          >
            {(demandMultiplier * 100).toFixed(0)}%
          </motion.span>
        </div>
        <div className="w-full bg-black/50 rounded-full h-1.5 overflow-hidden border border-white/5">
          <motion.div
            animate={{ width: `${demandMultiplier * 100}%` }}
            transition={{ type: "spring", stiffness: 40 }}
            className="bg-gradient-to-r from-[#00FFB2] to-[#E7FF43] h-full shadow-[0_0_10px_rgba(231,255,67,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
}

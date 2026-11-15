import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car } from 'lucide-react';

type SlotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSlot {
  id: string;
  zone: string;
  number: number;
  status: SlotStatus;
}

const generateSlots = (zone: string, count: number, occupiedCount: number, reservedCount: number): ParkingSlot[] => {
  return Array.from({ length: count }).map((_, i) => {
    let status: SlotStatus = 'available';
    if (i < occupiedCount) status = 'occupied';
    else if (i >= count - reservedCount) status = 'reserved';
    
    return {
      id: `${zone}-${i + 1}`,
      zone,
      number: i + 1,
      status,
    };
  }).sort(() => Math.random() - 0.5); // Randomize for realistic look
};

const parkingData: Record<string, ParkingSlot[]> = {
  'Zone A': generateSlots('A', 30, 18, 4),
  'Zone B': generateSlots('B', 30, 8, 2),
  'VIP': generateSlots('VIP', 10, 5, 5),
};

const getStatusColor = (status: SlotStatus) => {
  switch (status) {
    case 'available': return 'bg-green-500/20 border-green-500/50 text-green-400';
    case 'occupied': return 'bg-red-500/20 border-red-500/50 text-red-400';
    case 'reserved': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
    default: return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
  }
};

export const ParkingLayout = () => {
  const [activeZone, setActiveZone] = useState('Zone A');
  const slots = parkingData[activeZone];

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Live Parking Layout</h1>
          <p className="text-gray-400">Interactive map of all parking zones.</p>
        </div>
        
        <div className="flex bg-[#030014]/50 border border-white/10 rounded-xl p-1">
          {Object.keys(parkingData).map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeZone === zone 
                  ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-300">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-gray-300">Reserved</span>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl flex-1 flex flex-col justify-center items-center overflow-auto custom-scrollbar">
        <div className="w-full max-w-4xl grid grid-cols-5 md:grid-cols-10 gap-3">
          {slots.map((slot, index) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className={`
                aspect-[4/5] rounded-lg border-2 flex flex-col items-center justify-center gap-1 cursor-pointer
                transition-colors shadow-lg relative group
                ${getStatusColor(slot.status)}
              `}
            >
              <span className="text-xs font-bold opacity-80">{slot.id}</span>
              {slot.status === 'occupied' && (
                <Car size={20} className="text-current drop-shadow-md" />
              )}
              {slot.status === 'reserved' && (
                <div className="w-4 h-4 text-xs flex items-center justify-center font-bold">R</div>
              )}

              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0a071c] border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                Slot {slot.id} • <span className="capitalize">{slot.status}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Road visualizer */}
        <div className="w-full max-w-4xl h-16 border-y-2 border-dashed border-gray-600 mt-12 relative flex items-center justify-center">
          <span className="text-gray-500 font-bold uppercase tracking-[0.5em] text-sm">Driveway</span>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Download } from 'lucide-react';

const mockVehicles = [
  { id: '1', plate: 'MH-12-AB-1234', owner: 'Rahul Sharma', entry: '2023-10-25 08:15 AM', status: 'Parked', zone: 'Zone A', slot: 'A-12' },
  { id: '2', plate: 'DL-01-CA-9876', owner: 'Priya Patel', entry: '2023-10-25 09:30 AM', status: 'Parked', zone: 'Zone B', slot: 'B-04' },
  { id: '3', plate: 'KA-05-XY-5555', owner: 'Amit Singh', entry: '2023-10-25 11:45 AM', status: 'Exited', zone: 'Zone A', slot: 'A-22' },
  { id: '4', plate: 'MH-14-ZZ-7777', owner: 'Neha Gupta', entry: '2023-10-25 01:20 PM', status: 'Parked', zone: 'VIP', slot: 'V-02' },
  { id: '5', plate: 'GJ-03-LK-4321', owner: 'Vikram Joshi', entry: '2023-10-25 02:10 PM', status: 'Parked', zone: 'Zone A', slot: 'A-05' },
  { id: '6', plate: 'UP-32-MN-9999', owner: 'Sana Khan', entry: '2023-10-25 03:00 PM', status: 'Exited', zone: 'Zone B', slot: 'B-15' },
  { id: '7', plate: 'RJ-14-PQ-1111', owner: 'Ravi Kumar', entry: '2023-10-25 04:30 PM', status: 'Parked', zone: 'Zone A', slot: 'A-28' },
];

export const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = mockVehicles.filter(v => 
    v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Vehicle Logs</h1>
          <p className="text-gray-400">Track entries, exits, and current parked vehicles.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search plate or owner..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-10 pr-4 py-2 w-full md:w-64 text-sm"
            />
          </div>
          <button className="glass-panel p-2 rounded-lg text-gray-300 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-gradient-to-r from-brand-blue to-brand-purple text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-brand-blue/20">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-sm font-semibold text-gray-300">License Plate</th>
                <th className="p-4 text-sm font-semibold text-gray-300">Owner Name</th>
                <th className="p-4 text-sm font-semibold text-gray-300">Entry Time</th>
                <th className="p-4 text-sm font-semibold text-gray-300">Zone / Slot</th>
                <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <motion.tr 
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 font-medium text-brand-blue">
                    <div className="bg-brand-blue/10 border border-brand-blue/20 rounded-md px-2 py-1 inline-block">
                      {vehicle.plate}
                    </div>
                  </td>
                  <td className="p-4 text-gray-200">{vehicle.owner}</td>
                  <td className="p-4 text-gray-400 text-sm">{vehicle.entry}</td>
                  <td className="p-4">
                    <span className="text-gray-200">{vehicle.zone}</span>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-accent-purple font-medium">{vehicle.slot}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      vehicle.status === 'Parked' 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-gray-500/10 border-gray-500/20 text-gray-400'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredVehicles.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No vehicles found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

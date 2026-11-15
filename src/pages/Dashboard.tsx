import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { Car, CreditCard, Clock, Activity } from 'lucide-react';

const revenueData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 1400 },
  { name: 'Wed', amount: 1100 },
  { name: 'Thu', amount: 1800 },
  { name: 'Fri', amount: 2200 },
  { name: 'Sat', amount: 3100 },
  { name: 'Sun', amount: 2800 },
];

const occupancyData = [
  { time: '08:00', occupancy: 30 },
  { time: '10:00', occupancy: 65 },
  { time: '12:00', occupancy: 85 },
  { time: '14:00', occupancy: 95 },
  { time: '16:00', occupancy: 75 },
  { time: '18:00', occupancy: 50 },
  { time: '20:00', occupancy: 40 },
];

const statsCards = [
  { title: 'Total Slots', value: '250', icon: Car, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
  { title: 'Occupied', value: '185', icon: Activity, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  { title: 'Available', value: '65', icon: Clock, color: 'text-green-400', bg: 'bg-green-400/10' },
  { title: "Today's Revenue", value: '₹12,450', icon: CreditCard, color: 'text-accent-pink', bg: 'bg-accent-pink/10' },
];

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Real-time statistics and analytics for ParkSmart.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl flex items-center justify-between"
          >
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Weekly Revenue</h3>
            <select className="bg-[#030014]/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: 'rgba(10,7,28,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                />
                <Bar dataKey="amount" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#4facfe" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Today's Occupancy Trend</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#888" tickLine={false} axisLine={false} />
                <YAxis stroke="#888" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10,7,28,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} 
                />
                <Area type="monotone" dataKey="occupancy" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorOccupancy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldAlert, Users, Compass, BookOpen, Bell, FileText, BarChart3,
  Plus, Edit3, Trash2, Search, Settings, Database, Activity,
  UserCheck, GraduationCap, Target
} from 'lucide-react';

// Mock data
const MOCK_USERS = [
  { id: 1, name: 'Aman Sharma', email: 'aman@eduverse.com', role: 'student', status: 'active', class: '11' },
  { id: 2, name: 'Mr. Rajesh Verma', email: 'rajesh@eduverse.com', role: 'teacher', status: 'active', class: '-' },
  { id: 3, name: 'Mrs. Sunita Sharma', email: 'sunita@eduverse.com', role: 'parent', status: 'active', class: '-' },
  { id: 4, name: 'Dr. Meera Nair', email: 'meera@eduverse.com', role: 'counselor', status: 'active', class: '-' },
  { id: 5, name: 'Priya Patel', email: 'priya@eduverse.com', role: 'student', status: 'active', class: '11' },
  { id: 6, name: 'Rahul Kumar', email: 'rahul@eduverse.com', role: 'student', status: 'inactive', class: '11' },
  { id: 7, name: 'Admin User', email: 'admin@eduverse.com', role: 'admin', status: 'active', class: '-' },
];

const MOCK_COURSES = [
  { id: 1, name: 'Python Programming', category: 'Programming', students: 120, status: 'active' },
  { id: 2, name: 'Data Structures & Algorithms', category: 'CS Core', students: 95, status: 'active' },
  { id: 3, name: 'Machine Learning Fundamentals', category: 'AI/ML', students: 78, status: 'active' },
  { id: 4, name: 'Web Development with React', category: 'Web Dev', students: 110, status: 'active' },
  { id: 5, name: 'Cyber Security Basics', category: 'Security', students: 45, status: 'draft' },
];

const MOCK_CAREERS = [
  { id: 1, name: 'AI & ML Engineer', category: 'Technology', demand: 'High', avgSalary: '₹12 LPA' },
  { id: 2, name: 'Full Stack Developer', category: 'Technology', demand: 'Very High', avgSalary: '₹10 LPA' },
  { id: 3, name: 'Data Scientist', category: 'Technology', demand: 'High', avgSalary: '₹14 LPA' },
  { id: 4, name: 'Cyber Security Analyst', category: 'Technology', demand: 'Medium', avgSalary: '₹9 LPA' },
  { id: 5, name: 'Product Manager', category: 'Management', demand: 'High', avgSalary: '₹18 LPA' },
];

const MOCK_NOTIFICATIONS_LIST = [
  { id: 1, title: 'New semester started', message: 'Semester 2 has started. Update academic data.', target: 'all', sent: true },
  { id: 2, title: 'Career prediction updated', message: 'AI predictions have been refreshed for all students.', target: 'students', sent: true },
  { id: 3, title: 'Parent-teacher meeting', message: 'PTM scheduled for Jan 20, 2025.', target: 'parents', sent: false },
];

type AdminTab = 'users' | 'dataset' | 'courses' | 'careers' | 'notifications' | 'reports' | 'analytics';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = MOCK_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.includes(searchQuery);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'dataset', label: 'Manage Dataset', icon: Database },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'careers', label: 'Manage Careers', icon: Compass },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-brand-blue" />
            Administrator Panel
          </h1>
          <p className="text-sm text-slate-400 mt-1">Full platform management and analytics</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
          <Settings className="w-4 h-4 text-brand-blue" />
          <span className="text-slate-400">System Status: <strong className="text-emerald-400">Online</strong></span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer
              ${activeTab === tab.id 
                ? 'bg-brand-blue/10 border border-brand-blue/30 text-white' 
                : 'glass-panel text-slate-400 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Manage Users */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white">All Users</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search users..." className="glass-input pl-9 pr-4 py-2 text-sm w-56" />
              </div>
              <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="glass-input px-3 py-2 text-sm cursor-pointer">
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="parent">Parents</option>
                <option value="teacher">Teachers</option>
                <option value="counselor">Counselors</option>
                <option value="admin">Admins</option>
              </select>
              <button className="px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center gap-1 cursor-pointer hover:bg-brand-blue/20 transition">
                <Plus className="w-4 h-4" /> Add User
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Name</th>
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Email</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Role</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Status</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-3 text-white font-medium">{u.name}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{u.email}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-lg bg-brand-blue/10 text-brand-blue text-[10px] font-bold capitalize">{u.role}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${u.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-brand-blue transition cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-rose-400 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manage Dataset */}
      {activeTab === 'dataset' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <h3 className="text-lg font-bold text-white">Dataset Management</h3>
          <p className="text-sm text-slate-400">Manage training data for the ML prediction engine.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Student Records', count: '50,230', icon: GraduationCap },
              { label: 'Feature Vectors', count: '13 features', icon: Database },
              { label: 'ML Model Accuracy', count: '87.3%', icon: Target },
            ].map((d, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] text-center">
                <d.icon className="w-6 h-6 text-brand-blue mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{d.count}</p>
                <p className="text-xs text-slate-500 mt-1">{d.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2.5 rounded-xl bg-brand-blue/10 text-brand-blue text-sm font-bold cursor-pointer hover:bg-brand-blue/20 transition">
              Upload CSV Dataset
            </button>
            <button className="px-4 py-2.5 rounded-xl bg-brand-purple/10 text-brand-purple text-sm font-bold cursor-pointer hover:bg-brand-purple/20 transition">
              Retrain ML Model
            </button>
          </div>
        </div>
      )}

      {/* Manage Courses */}
      {activeTab === 'courses' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Courses Database</h3>
            <button className="px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center gap-1 cursor-pointer"><Plus className="w-4 h-4" /> Add Course</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Course</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Category</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Students</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Status</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_COURSES.map(c => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-3 text-white font-medium">{c.name}</td>
                    <td className="py-3 px-3 text-center text-slate-400 text-xs">{c.category}</td>
                    <td className="py-3 px-3 text-center text-brand-blue">{c.students}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-brand-blue transition cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-rose-400 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manage Careers */}
      {activeTab === 'careers' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Career Database</h3>
            <button className="px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center gap-1 cursor-pointer"><Plus className="w-4 h-4" /> Add Career</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Career</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Category</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Demand</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Avg Salary</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CAREERS.map(c => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-3 text-white font-medium">{c.name}</td>
                    <td className="py-3 px-3 text-center text-slate-400 text-xs">{c.category}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        c.demand === 'Very High' ? 'bg-emerald-500/10 text-emerald-400' :
                        c.demand === 'High' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>{c.demand}</span>
                    </td>
                    <td className="py-3 px-3 text-center text-brand-blue">{c.avgSalary}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-brand-blue transition cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.05] text-slate-500 hover:text-rose-400 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Notification Manager</h3>
            <button className="px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue text-sm font-bold flex items-center gap-1 cursor-pointer"><Plus className="w-4 h-4" /> New Notification</button>
          </div>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS_LIST.map(n => (
              <div key={n.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                <Bell className={`w-5 h-5 mt-0.5 ${n.sent ? 'text-emerald-400' : 'text-amber-400'}`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                  <p className="text-[10px] text-slate-600 mt-1">Target: <span className="text-brand-blue capitalize">{n.target}</span></p>
                </div>
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${n.sent ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {n.sent ? 'SENT' : 'DRAFT'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04] space-y-4">
          <h3 className="text-lg font-bold text-white">Generate System Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Student Report', desc: 'Complete student data with predictions', icon: '🎓' },
              { name: 'Teacher Report', desc: 'Teacher activity and student management', icon: '📚' },
              { name: 'Parent Report', desc: 'Ward performance summary', icon: '👨‍👩‍👦' },
              { name: 'Career Report', desc: 'Career prediction analytics', icon: '🎯' },
              { name: 'Placement Report', desc: 'Placement readiness across students', icon: '💼' },
              { name: 'System Analytics', desc: 'Platform usage and engagement', icon: '📈' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.desc}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-bold cursor-pointer">PDF</button>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold cursor-pointer">Excel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: '50,237', color: 'text-brand-blue' },
              { label: 'Active Students', value: '42,180', color: 'text-emerald-400' },
              { label: 'ML Predictions', value: '38,500', color: 'text-brand-purple' },
              { label: 'Avg Confidence', value: '78%', color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/[0.04] text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Career Distribution */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Career Distribution</h3>
              <div className="space-y-3">
                {[
                  { career: 'AI & ML', pct: 27, color: 'bg-brand-blue' },
                  { career: 'Full Stack Dev', pct: 22, color: 'bg-brand-purple' },
                  { career: 'Data Science', pct: 18, color: 'bg-emerald-400' },
                  { career: 'Cloud/DevOps', pct: 15, color: 'bg-amber-400' },
                  { career: 'Cyber Security', pct: 10, color: 'bg-rose-400' },
                  { career: 'Others', pct: 8, color: 'bg-indigo-400' },
                ].map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{c.career}</span>
                      <span className="text-slate-500">{c.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`${c.color} h-1.5 rounded-full`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Distribution */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Learning Persona Distribution</h3>
              <div className="space-y-3">
                {[
                  { type: 'Visual', pct: 35, color: 'bg-blue-400' },
                  { type: 'Logical', pct: 25, color: 'bg-purple-400' },
                  { type: 'Kinesthetic', pct: 18, color: 'bg-rose-400' },
                  { type: 'Reading', pct: 12, color: 'bg-emerald-400' },
                  { type: 'Auditory', pct: 10, color: 'bg-amber-400' },
                ].map((p, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{p.type}</span>
                      <span className="text-slate-500">{p.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`${p.color} h-1.5 rounded-full`} style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Readiness */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
            <h3 className="text-sm font-bold text-slate-300 mb-4">Platform-wide Placement Readiness</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Technical', value: 72, color: 'text-brand-blue' },
                { label: 'Communication', value: 65, color: 'text-emerald-400' },
                { label: 'Resume', value: 58, color: 'text-amber-400' },
                { label: 'Interview', value: 62, color: 'text-brand-purple' },
                { label: 'Overall', value: 64, color: 'text-white' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="relative w-16 h-16 mx-auto">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-800" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className={s.color} strokeDasharray={`${s.value * 1.76} 176`} strokeLinecap="round" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${s.color}`}>{s.value}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

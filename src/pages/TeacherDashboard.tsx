import React, { useState } from 'react';
import {
  Users, BookOpen, BarChart3, UserCheck, UserX, Award,
  TrendingUp, TrendingDown, Search, Filter, Eye, FileText,
  GraduationCap, Activity, Brain
} from 'lucide-react';

// Mock student data for teacher
const MOCK_STUDENTS = [
  { id: 1, name: 'Aman Sharma', rollNo: '042', stream: 'PCM', cgpa: 8.2, attendance: 87, career: 'AI & ML Engineer', confidence: 82, persona: 'Visual', status: 'good' },
  { id: 2, name: 'Priya Patel', rollNo: '015', stream: 'PCM', cgpa: 9.1, attendance: 95, career: 'Data Scientist', confidence: 88, persona: 'Logical', status: 'excellent' },
  { id: 3, name: 'Rahul Kumar', rollNo: '028', stream: 'PCM', cgpa: 6.5, attendance: 72, career: 'Full Stack Dev', confidence: 65, persona: 'Kinesthetic', status: 'weak' },
  { id: 4, name: 'Sneha Gupta', rollNo: '033', stream: 'PCB', cgpa: 8.8, attendance: 91, career: 'Doctor (MBBS)', confidence: 85, persona: 'Reading', status: 'good' },
  { id: 5, name: 'Vikram Singh', rollNo: '007', stream: 'PCM', cgpa: 5.8, attendance: 65, career: 'DevOps Engineer', confidence: 55, persona: 'Auditory', status: 'weak' },
  { id: 6, name: 'Neha Verma', rollNo: '021', stream: 'Commerce', cgpa: 7.9, attendance: 88, career: 'CA', confidence: 78, persona: 'Visual', status: 'good' },
  { id: 7, name: 'Arjun Reddy', rollNo: '050', stream: 'PCM', cgpa: 9.5, attendance: 98, career: 'Cloud Architect', confidence: 91, persona: 'Logical', status: 'excellent' },
  { id: 8, name: 'Kavya Nair', rollNo: '012', stream: 'Arts', cgpa: 7.2, attendance: 80, career: 'UX Designer', confidence: 72, persona: 'Visual', status: 'average' },
];

const MOCK_CLASS_STATS = {
  totalStudents: 45,
  averageCGPA: 7.6,
  averageAttendance: 83,
  topPerformers: 8,
  weakStudents: 5,
  careerConfidenceAvg: 74,
};

export const TeacherDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'students' | 'attendance' | 'performance' | 'persona' | 'career' | 'analytics' | 'reports'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'excellent' | 'good' | 'average' | 'weak'>('all');

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.includes(searchQuery);
    const matchesFilter = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const weakStudents = MOCK_STUDENTS.filter(s => s.status === 'weak');
  const topStudents = MOCK_STUDENTS.filter(s => s.status === 'excellent');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-brand-blue" />
            Teacher Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">Manage students, track performance, and view analytics</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl text-sm text-slate-400">
          Class: <strong className="text-white">XI-A (PCM)</strong> | Students: <strong className="text-brand-blue">{MOCK_CLASS_STATS.totalStudents}</strong>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'performance', label: 'Performance', icon: BarChart3 },
          { id: 'persona', label: 'Learning Persona', icon: Brain },
          { id: 'career', label: 'Career Reports', icon: TrendingUp },
          { id: 'analytics', label: 'Analytics', icon: Activity },
          { id: 'reports', label: 'Reports', icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer
              ${activeSection === tab.id 
                ? 'bg-brand-blue/10 border border-brand-blue/30 text-white' 
                : 'glass-panel text-slate-400 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Total Students', value: MOCK_CLASS_STATS.totalStudents, color: 'text-brand-blue' },
              { label: 'Avg CGPA', value: MOCK_CLASS_STATS.averageCGPA.toFixed(1), color: 'text-emerald-400' },
              { label: 'Avg Attendance', value: `${MOCK_CLASS_STATS.averageAttendance}%`, color: 'text-amber-400' },
              { label: 'Top Performers', value: MOCK_CLASS_STATS.topPerformers, color: 'text-green-400' },
              { label: 'Weak Students', value: MOCK_CLASS_STATS.weakStudents, color: 'text-rose-400' },
              { label: 'Career Conf.', value: `${MOCK_CLASS_STATS.careerConfidenceAvg}%`, color: 'text-brand-purple' },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 rounded-2xl border border-white/[0.04] text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Weak & Top Students side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-rose-400 mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" /> Weak Students (Need Attention)
              </h3>
              <div className="space-y-3">
                {weakStudents.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-rose-500/5 border border-rose-500/10">
                    <div>
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-slate-500">CGPA: {s.cgpa} | Att: {s.attendance}%</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-rose-500/10 text-rose-400 text-[10px] font-bold">WEAK</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Top Performers
              </h3>
              <div className="space-y-3">
                {topStudents.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <div>
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-slate-500">CGPA: {s.cgpa} | Att: {s.attendance}%</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">TOP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students List */}
      {activeSection === 'students' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-white">All Students</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name or roll no..."
                  className="glass-input pl-9 pr-4 py-2 text-sm w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as any)}
                className="glass-input px-3 py-2 text-sm cursor-pointer"
              >
                <option value="all">All</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="weak">Weak</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Roll</th>
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Name</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Stream</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">CGPA</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Attendance</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Career</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s.id} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-3 text-slate-500">{s.rollNo}</td>
                    <td className="py-3 px-3 text-white font-medium">{s.name}</td>
                    <td className="py-3 px-3 text-center text-slate-400">{s.stream}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`font-semibold ${s.cgpa >= 8 ? 'text-emerald-400' : s.cgpa >= 6 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {s.cgpa}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`${s.attendance >= 85 ? 'text-emerald-400' : s.attendance >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-brand-blue text-xs">{s.career}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        s.status === 'excellent' ? 'bg-emerald-500/10 text-emerald-400' :
                        s.status === 'good' ? 'bg-blue-500/10 text-blue-400' :
                        s.status === 'average' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Attendance Management */}
      {activeSection === 'attendance' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Attendance Overview</h3>
          <div className="space-y-3">
            {MOCK_STUDENTS.map(s => {
              const pct = s.attendance;
              return (
                <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 flex items-center justify-center text-xs font-bold text-white">
                    {s.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{s.name}</span>
                      <span className={`text-xs font-bold ${pct >= 85 ? 'text-emerald-400' : pct >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all ${pct >= 85 ? 'bg-emerald-400' : pct >= 75 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  {pct < 75 && <UserX className="w-4 h-4 text-rose-400" />}
                  {pct >= 85 && <UserCheck className="w-4 h-4 text-emerald-400" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Performance */}
      {activeSection === 'performance' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">CGPA Distribution</h3>
          <div className="space-y-4">
            {[
              { range: '9.0 - 10.0', count: 2, color: 'bg-emerald-400', pct: 25 },
              { range: '8.0 - 8.9', count: 2, color: 'bg-blue-400', pct: 25 },
              { range: '7.0 - 7.9', count: 2, color: 'bg-amber-400', pct: 25 },
              { range: '6.0 - 6.9', count: 1, color: 'bg-orange-400', pct: 12.5 },
              { range: 'Below 6.0', count: 1, color: 'bg-rose-400', pct: 12.5 },
            ].map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{d.range}</span>
                  <span className="text-slate-500">{d.count} students ({d.pct}%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className={`${d.color} h-2 rounded-full`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Persona */}
      {activeSection === 'persona' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Learning Persona Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { type: 'Visual', count: 3, pct: 37, color: 'from-blue-500 to-cyan-400' },
              { type: 'Logical', count: 2, pct: 25, color: 'from-purple-500 to-indigo-400' },
              { type: 'Auditory', count: 1, pct: 13, color: 'from-amber-500 to-orange-400' },
              { type: 'Reading', count: 1, pct: 13, color: 'from-emerald-500 to-green-400' },
              { type: 'Kinesthetic', count: 1, pct: 12, color: 'from-rose-500 to-pink-400' },
            ].map((p, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] text-center">
                <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${p.color}`}>
                  {p.pct}%
                </div>
                <p className="text-sm font-semibold text-white mt-2">{p.type}</p>
                <p className="text-xs text-slate-500">{p.count} students</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Reports */}
      {activeSection === 'career' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Student Career Predictions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Student</th>
                  <th className="text-left py-3 px-3 text-slate-400 font-medium">Career Prediction</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Confidence</th>
                  <th className="text-center py-3 px-3 text-slate-400 font-medium">Learning Style</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map(s => (
                  <tr key={s.id} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-3 text-white font-medium">{s.name}</td>
                    <td className="py-3 px-3 text-brand-blue">{s.career}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-slate-800 rounded-full h-1.5">
                          <div className="bg-brand-blue h-1.5 rounded-full" style={{ width: `${s.confidence}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{s.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-xs text-slate-400">{s.persona}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics */}
      {activeSection === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Skill Distribution</h3>
              <div className="space-y-3">
                {[
                  { skill: 'Programming', avg: 72, color: 'bg-brand-blue' },
                  { skill: 'Mathematics', avg: 68, color: 'bg-brand-purple' },
                  { skill: 'Communication', avg: 65, color: 'bg-emerald-400' },
                  { skill: 'Problem Solving', avg: 70, color: 'bg-amber-400' },
                  { skill: 'Leadership', avg: 55, color: 'bg-rose-400' },
                  { skill: 'Creativity', avg: 62, color: 'bg-indigo-400' },
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">{s.skill}</span>
                      <span className="text-slate-500">{s.avg}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className={`${s.color} h-1.5 rounded-full`} style={{ width: `${s.avg}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Career Distribution</h3>
              <div className="space-y-3">
                {[
                  { career: 'AI & ML', count: 12, pct: 27 },
                  { career: 'Full Stack Dev', count: 8, pct: 18 },
                  { career: 'Data Science', count: 7, pct: 16 },
                  { career: 'Cloud/DevOps', count: 6, pct: 13 },
                  { career: 'Cyber Security', count: 5, pct: 11 },
                  { career: 'Others', count: 7, pct: 15 },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.01] border border-white/[0.03]">
                    <span className="text-sm text-slate-300">{c.career}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{c.count} students</span>
                      <span className="text-xs text-brand-blue font-bold">{c.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {activeSection === 'reports' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Generate Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Class Performance Report', desc: 'Overall class academic analysis', icon: '📊' },
              { name: 'Attendance Report', desc: 'Student-wise attendance breakdown', icon: '📅' },
              { name: 'Career Prediction Report', desc: 'AI career predictions for all students', icon: '🎯' },
              { name: 'Weak Student Report', desc: 'Students needing intervention', icon: '⚠️' },
              { name: 'Skill Analysis Report', desc: 'Class-wide skill distribution', icon: '💡' },
              { name: 'Learning Persona Report', desc: 'Learning style distribution', icon: '🧠' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.desc}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-bold hover:bg-brand-blue/20 transition cursor-pointer">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

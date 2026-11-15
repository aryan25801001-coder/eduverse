import React, { useState } from 'react';
import { 
  Users, BookOpen, TrendingUp, Calendar, Bell, FileText, 
  ChevronDown, Eye, Target, BarChart3, GraduationCap, Clock,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Mock student data for parent view
const MOCK_STUDENT = {
  name: 'Aman Sharma',
  class: 'Class 11',
  stream: 'Science (PCM)',
  rollNo: 'STU-2025-0042',
  attendance: 87,
  cgpa: 8.2,
  learningStyle: 'Visual Learner',
  careerPrediction: 'AI & ML Engineer',
  careerConfidence: 82,
  semester: 'Semester 1',
};

const MOCK_MARKS = [
  { subject: 'Physics', marks: 78, total: 100, grade: 'B+' },
  { subject: 'Chemistry', marks: 82, total: 100, grade: 'A' },
  { subject: 'Mathematics', marks: 91, total: 100, grade: 'A+' },
  { subject: 'Computer Science', marks: 95, total: 100, grade: 'A+' },
  { subject: 'English', marks: 74, total: 100, grade: 'B' },
];

const MOCK_ATTENDANCE_LOG = [
  { month: 'Jan', present: 22, total: 24 },
  { month: 'Feb', present: 19, total: 22 },
  { month: 'Mar', present: 21, total: 23 },
  { month: 'Apr', present: 18, total: 21 },
  { month: 'May', present: 20, total: 22 },
];

const MOCK_NOTIFICATIONS = [
  { id: 1, text: 'Semester 1 results published. Check your ward\'s marks.', time: '2 hours ago', type: 'info' },
  { id: 2, text: 'Career prediction updated: AI & ML Engineer (82% confidence).', time: '1 day ago', type: 'success' },
  { id: 3, text: 'Attendance dropped below 90% this month. Please check.', time: '3 days ago', type: 'warning' },
  { id: 4, text: 'New project recommendation: Sentiment Analysis Dashboard.', time: '5 days ago', type: 'info' },
];

const ROADMAP_STEPS = [
  { label: 'Class 11', status: 'current', detail: 'Build fundamentals, explore interests' },
  { label: 'Class 12', status: 'upcoming', detail: 'Focus on boards & competitive exams' },
  { label: 'College', status: 'upcoming', detail: 'B.Tech CSE / B.Sc CS' },
  { label: 'Programming', status: 'upcoming', detail: 'Master DSA, Python, JS' },
  { label: 'Projects', status: 'upcoming', detail: '3-5 portfolio projects' },
  { label: 'Internship', status: 'upcoming', detail: 'Industry experience' },
  { label: 'Placement', status: 'upcoming', detail: 'Interview preparation' },
  { label: 'Job', status: 'upcoming', detail: 'First role as Engineer' },
];

export const ParentDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'marks' | 'attendance' | 'career' | 'roadmap' | 'notifications' | 'reports'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-blue" />
            Parent Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">Monitor your ward's academic progress and career journey</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-brand-purple" />
          <span className="text-sm text-slate-300">Ward: <strong className="text-white">{MOCK_STUDENT.name}</strong></span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-brand-blue">{MOCK_STUDENT.class}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'marks', label: 'Marks', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'career', label: 'Career Prediction', icon: Target },
          { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
          { id: 'notifications', label: 'Notifications', icon: Bell },
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
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'CGPA', value: MOCK_STUDENT.cgpa.toFixed(1), icon: BarChart3, color: 'text-brand-blue', trend: '+0.3', up: true },
              { label: 'Attendance', value: `${MOCK_STUDENT.attendance}%`, icon: Calendar, color: 'text-emerald-400', trend: '-2%', up: false },
              { label: 'Career Match', value: `${MOCK_STUDENT.careerConfidence}%`, icon: Target, color: 'text-brand-purple', trend: '+5%', up: true },
              { label: 'Semester', value: MOCK_STUDENT.semester, icon: Clock, color: 'text-amber-400', trend: '', up: true },
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/[0.04]">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  {stat.trend && (
                    <span className={`text-xs flex items-center gap-0.5 ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-3">Learning Persona</h3>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                {MOCK_STUDENT.learningStyle}
              </div>
              <p className="text-xs text-slate-500 mt-2">Your ward learns best through visual aids like diagrams, charts, and video content.</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
              <h3 className="text-sm font-bold text-slate-300 mb-3">Career Prediction</h3>
              <div className="text-xl font-bold text-white">{MOCK_STUDENT.careerPrediction}</div>
              <div className="mt-2 w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-brand-blue to-brand-purple h-2 rounded-full" style={{ width: `${MOCK_STUDENT.careerConfidence}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-2">Confidence: {MOCK_STUDENT.careerConfidence}%</p>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
            <h3 className="text-sm font-bold text-slate-300 mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              {MOCK_NOTIFICATIONS.slice(0, 3).map(n => (
                <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-emerald-400' : 'bg-brand-blue'
                  }`} />
                  <div>
                    <p className="text-sm text-slate-300">{n.text}</p>
                    <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marks Section */}
      {activeSection === 'marks' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Subject-wise Marks — {MOCK_STUDENT.semester}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Subject</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Marks</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Total</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Percentage</th>
                  <th className="text-center py-3 px-4 text-slate-400 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MARKS.map((m, i) => (
                  <tr key={i} className="border-b border-slate-800/50 hover:bg-white/[0.01]">
                    <td className="py-3 px-4 text-white font-medium">{m.subject}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{m.marks}</td>
                    <td className="py-3 px-4 text-center text-slate-500">{m.total}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-semibold ${m.marks >= 80 ? 'text-emerald-400' : m.marks >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {m.marks}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-bold">{m.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-white/[0.01] rounded-xl border border-white/[0.03]">
            <p className="text-sm text-slate-400">Overall Average: <strong className="text-white">{(MOCK_MARKS.reduce((s, m) => s + m.marks, 0) / MOCK_MARKS.length).toFixed(1)}%</strong></p>
          </div>
        </div>
      )}

      {/* Attendance Section */}
      {activeSection === 'attendance' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Monthly Attendance Record</h3>
          <div className="space-y-4">
            {MOCK_ATTENDANCE_LOG.map((a, i) => {
              const pct = Math.round((a.present / a.total) * 100);
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{a.month}</span>
                    <span className={`font-semibold ${pct >= 85 ? 'text-emerald-400' : pct >= 75 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {a.present}/{a.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${pct >= 85 ? 'bg-emerald-400' : pct >= 75 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-white/[0.01] rounded-xl border border-white/[0.03]">
            <p className="text-sm text-slate-400">Overall Attendance: <strong className="text-white">{MOCK_STUDENT.attendance}%</strong></p>
            {MOCK_STUDENT.attendance < 90 && (
              <p className="text-xs text-amber-400 mt-1">⚠️ Attendance is below 90%. Encourage regular attendance.</p>
            )}
          </div>
        </div>
      )}

      {/* Career Prediction Section */}
      {activeSection === 'career' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">AI Career Prediction</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 border border-brand-blue/20">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Primary Prediction</p>
              <h2 className="text-2xl font-bold text-white">{MOCK_STUDENT.careerPrediction}</h2>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Confidence</span>
                  <span className="text-brand-blue font-bold">{MOCK_STUDENT.careerConfidence}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-brand-blue to-brand-purple h-2 rounded-full" style={{ width: `${MOCK_STUDENT.careerConfidence}%` }} />
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4">Based on: Math (91%), Programming (95%), Problem Solving, Projects</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-400 font-medium">Other Recommendations</p>
              {['Data Scientist', 'Full Stack Developer', 'Cloud Architect', 'Cyber Security Analyst'].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                  <span className="text-sm text-slate-300">{c}</span>
                  <span className="text-xs text-slate-500">{75 - i * 5}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Section */}
      {activeSection === 'roadmap' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-6">Career Roadmap Timeline</h3>
          <div className="relative">
            {ROADMAP_STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 mb-6 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    step.status === 'current' ? 'bg-brand-blue shadow-lg shadow-brand-blue/30' :
                    step.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-700'
                  }`} />
                  {i < ROADMAP_STEPS.length - 1 && <div className="w-0.5 h-12 bg-slate-800" />}
                </div>
                <div className={`p-4 rounded-xl flex-1 ${
                  step.status === 'current' ? 'bg-brand-blue/5 border border-brand-blue/20' : 'bg-white/[0.01] border border-white/[0.03]'
                }`}>
                  <p className={`text-sm font-bold ${step.status === 'current' ? 'text-brand-blue' : 'text-slate-400'}`}>
                    {step.label}
                    {step.status === 'current' && <span className="ml-2 text-[10px] bg-brand-blue/20 px-2 py-0.5 rounded-full">CURRENT</span>}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Section */}
      {activeSection === 'notifications' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">All Notifications</h3>
          <div className="space-y-3">
            {MOCK_NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition">
                <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                  n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-emerald-400' : 'bg-brand-blue'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{n.text}</p>
                  <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Section */}
      {activeSection === 'reports' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Download Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Student Progress Report', desc: 'Complete academic performance overview', icon: '📊' },
              { name: 'Attendance Report', desc: 'Monthly attendance breakdown', icon: '📅' },
              { name: 'Career Prediction Report', desc: 'AI-generated career analysis', icon: '🎯' },
              { name: 'Learning Persona Report', desc: 'Learning style analysis details', icon: '🧠' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition cursor-pointer">
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

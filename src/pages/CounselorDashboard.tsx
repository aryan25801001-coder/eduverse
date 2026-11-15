import React, { useState } from 'react';
import {
  Compass, Users, MessageSquare, Route, Target, Calendar,
  Plus, Edit3, Save, Clock, CheckCircle, FileText, Lightbulb
} from 'lucide-react';

// Mock data for counselor
const MOCK_STUDENTS_LIST = [
  { id: 1, name: 'Aman Sharma', class: '11', career: 'AI & ML Engineer', confidence: 82, lastSession: '2025-01-10', notes: 'Interested in deep learning. Needs more project experience.' },
  { id: 2, name: 'Priya Patel', class: '11', career: 'Data Scientist', confidence: 88, lastSession: '2025-01-08', notes: 'Strong analytical skills. Recommended Kaggle competitions.' },
  { id: 3, name: 'Rahul Kumar', class: '11', career: 'Full Stack Developer', confidence: 65, lastSession: '2025-01-05', notes: 'Weak fundamentals. Suggested starting with HTML/CSS basics.' },
  { id: 4, name: 'Vikram Singh', class: '11', career: 'DevOps Engineer', confidence: 55, lastSession: '2024-12-28', notes: 'Needs motivation. Career clarity is low. Schedule follow-up.' },
];

const MOCK_MEETINGS = [
  { id: 1, student: 'Aman Sharma', date: '2025-01-15', time: '10:00 AM', type: 'Career Guidance', status: 'scheduled' },
  { id: 2, student: 'Vikram Singh', date: '2025-01-16', time: '2:00 PM', type: 'Follow-up', status: 'scheduled' },
  { id: 3, student: 'Priya Patel', date: '2025-01-08', time: '11:00 AM', type: 'Career Review', status: 'completed' },
  { id: 4, student: 'Rahul Kumar', date: '2025-01-05', time: '3:00 PM', type: 'Guidance Session', status: 'completed' },
];

const CAREER_SUGGESTIONS_DB = [
  { career: 'AI & ML Engineer', skills: ['Python', 'TensorFlow', 'Math'], path: 'B.Tech CSE → ML Specialization → Research/Industry', tip: 'Focus on competitive programming and Kaggle.' },
  { career: 'Data Scientist', skills: ['SQL', 'Python', 'Statistics'], path: 'B.Tech/B.Sc → Data Science Masters → Analytics', tip: 'Build portfolio with real datasets from government portals.' },
  { career: 'Full Stack Developer', skills: ['JavaScript', 'React', 'Node.js'], path: 'B.Tech/BCA → Full Stack Bootcamp → Startup/MNC', tip: 'Contribute to open source projects on GitHub.' },
  { career: 'Cyber Security Analyst', skills: ['Linux', 'Networking', 'Python'], path: 'B.Tech CSE → CEH Certification → SOC Analyst', tip: 'Practice on TryHackMe and HackTheBox platforms.' },
  { career: 'Product Manager', skills: ['Communication', 'Analytics', 'UX'], path: 'BBA/B.Tech → MBA → APM Programs', tip: 'Build mock product specs and case studies.' },
];

export const CounselorDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'students' | 'meetings' | 'suggestions' | 'roadmap'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [meetingNotes, setMeetingNotes] = useState<Record<number, string>>({});
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState('');

  const handleSaveNote = (studentId: number) => {
    setMeetingNotes(prev => ({ ...prev, [studentId]: noteText }));
    setEditingNote(null);
    setNoteText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display flex items-center gap-2">
          <Compass className="w-6 h-6 text-brand-blue" />
          Career Counselor Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">Guide students, manage sessions, and provide career suggestions</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'students', label: 'Student Progress', icon: Users },
          { id: 'meetings', label: 'Meeting Notes', icon: MessageSquare },
          { id: 'suggestions', label: 'Career Suggestions', icon: Lightbulb },
          { id: 'roadmap', label: 'Roadmap Editing', icon: Route },
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

      {/* Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Students', value: MOCK_STUDENTS_LIST.length, color: 'text-brand-blue' },
              { label: 'Sessions This Month', value: 6, color: 'text-emerald-400' },
              { label: 'Upcoming Meetings', value: MOCK_MEETINGS.filter(m => m.status === 'scheduled').length, color: 'text-amber-400' },
              { label: 'Avg Career Confidence', value: '73%', color: 'text-brand-purple' },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-2xl border border-white/[0.04] text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Upcoming Meetings */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-blue" />
              Upcoming Sessions
            </h3>
            <div className="space-y-3">
              {MOCK_MEETINGS.filter(m => m.status === 'scheduled').map(m => (
                <div key={m.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                  <div>
                    <p className="text-sm font-semibold text-white">{m.student}</p>
                    <p className="text-xs text-slate-500">{m.type} | {m.date} at {m.time}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-bold">SCHEDULED</span>
                </div>
              ))}
            </div>
          </div>

          {/* Students needing attention */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
            <h3 className="text-sm font-bold text-amber-400 mb-4">⚠️ Students Needing Follow-up</h3>
            <div className="space-y-3">
              {MOCK_STUDENTS_LIST.filter(s => s.confidence < 70).map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div>
                    <p className="text-sm font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-slate-500">Career: {s.career} | Confidence: {s.confidence}%</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition cursor-pointer">
                    Schedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Student Progress */}
      {activeSection === 'students' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Student Progress Tracker</h3>
          <div className="space-y-4">
            {MOCK_STUDENTS_LIST.map(s => (
              <div key={s.id} className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-white">{s.name}</p>
                    <p className="text-xs text-slate-500">Class {s.class} | Last Session: {s.lastSession}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-brand-blue">{s.career}</p>
                    <p className="text-xs text-slate-500">Confidence: {s.confidence}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className={`h-2 rounded-full ${
                    s.confidence >= 80 ? 'bg-emerald-400' : s.confidence >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                  }`} style={{ width: `${s.confidence}%` }} />
                </div>
                <div className="p-3 bg-white/[0.01] rounded-lg border border-white/[0.02]">
                  <p className="text-xs text-slate-400"><strong className="text-slate-300">Notes:</strong> {meetingNotes[s.id] || s.notes}</p>
                </div>
                {editingNote === s.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      className="glass-input flex-1 px-3 py-2 text-sm"
                      placeholder="Add counselor notes..."
                    />
                    <button onClick={() => handleSaveNote(s.id)} className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold cursor-pointer">
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditingNote(s.id); setNoteText(meetingNotes[s.id] || s.notes); }}
                    className="flex items-center gap-2 text-xs text-brand-blue hover:text-brand-purple transition cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Notes
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meeting Notes */}
      {activeSection === 'meetings' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Meeting History</h3>
          <div className="space-y-3">
            {MOCK_MEETINGS.map(m => (
              <div key={m.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                <div className={`w-3 h-3 rounded-full mt-1 ${m.status === 'completed' ? 'bg-emerald-400' : 'bg-brand-blue'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{m.student}</p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      m.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {m.date} at {m.time} — {m.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Suggestions */}
      {activeSection === 'suggestions' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Career Guidance Database</h3>
          <div className="space-y-4">
            {CAREER_SUGGESTIONS_DB.map((c, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] space-y-3">
                <h4 className="text-base font-bold text-brand-blue">{c.career}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Key Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {c.skills.map((s, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-lg bg-brand-blue/10 text-brand-blue text-xs">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Recommended Path</p>
                    <p className="text-xs text-slate-300">{c.path}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Pro Tip</p>
                    <p className="text-xs text-amber-400">{c.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roadmap Editing */}
      {activeSection === 'roadmap' && (
        <div className="glass-panel p-6 rounded-2xl border border-white/[0.04]">
          <h3 className="text-lg font-bold text-white mb-4">Student Roadmap Editor</h3>
          <p className="text-sm text-slate-400 mb-6">Select a student and customize their career roadmap timeline.</p>
          
          {/* Student selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {MOCK_STUDENTS_LIST.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStudent(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer
                  ${selectedStudent === s.id 
                    ? 'bg-brand-blue/10 border border-brand-blue/30 text-white' 
                    : 'bg-white/[0.01] border border-white/[0.03] text-slate-400 hover:text-white'}`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {selectedStudent && (
            <div className="space-y-4">
              {[
                { phase: 'Class 11', task: 'Build fundamentals, explore coding', editable: true },
                { phase: 'Class 12', task: 'Focus on boards + JEE/NEET prep', editable: true },
                { phase: 'College (Yr 1-2)', task: 'Core CS subjects + side projects', editable: true },
                { phase: 'College (Yr 3)', task: 'Internships + open source contributions', editable: true },
                { phase: 'College (Yr 4)', task: 'Placement prep + final year project', editable: true },
                { phase: 'Post Graduation', task: 'First job / higher studies', editable: true },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 flex items-center justify-center text-xs font-bold text-brand-blue">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{step.phase}</p>
                    <input
                      type="text"
                      defaultValue={step.task}
                      className="glass-input w-full mt-1 px-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
              ))}
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm font-bold cursor-pointer hover:opacity-90 transition flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Roadmap Changes
              </button>
            </div>
          )}

          {!selectedStudent && (
            <div className="text-center py-12 text-slate-500">
              <Route className="w-10 h-10 mx-auto mb-3 text-slate-600" />
              <p className="text-sm">Select a student above to edit their roadmap</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

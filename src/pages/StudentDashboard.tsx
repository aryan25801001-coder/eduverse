import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileAPI, assessmentAPI, predictionAPI, notificationAPI } from '../services/api';
import { ProgressCircle } from '../components/ProgressCircle';
import { DashboardSkeleton } from '../components/LoadingSkeleton';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import {
  Sparkles, User, GraduationCap, TrendingUp, ClipboardCheck, Bell,
  Brain, Target, Activity, Zap, ChevronRight, BookOpen, Award,
  Code, MessageSquare, Crown, Lightbulb, Puzzle, BarChart3, ArrowRight
} from 'lucide-react';

interface StudentDashboardProps {
  setActiveTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [careerData, setCareerData] = useState<any>(null);
  const [personaData, setPersonaData] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [profileRes, assessmentRes, careerRes, personaRes, notifRes] = await Promise.allSettled([
        profileAPI.get(),
        assessmentAPI.getResult(),
        predictionAPI.getCareer(),
        predictionAPI.getPersona(),
        notificationAPI.getAll(),
      ]);

      if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
      if (assessmentRes.status === 'fulfilled') setAssessment(assessmentRes.value.data?.result);
      if (careerRes.status === 'fulfilled') setCareerData(careerRes.value.data);
      if (personaRes.status === 'fulfilled') setPersonaData(personaRes.value.data);
      if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data?.notifications || []);
    } catch (err) {
      // Handle gracefully
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DashboardSkeleton />;

  const skillData = [
    { skill: 'Logic', value: profile?.logical_thinking || 60 },
    { skill: 'Code', value: profile?.programming_skills || 45 },
    { skill: 'Comm', value: profile?.communication_skills || 80 },
    { skill: 'Lead', value: profile?.leadership || 70 },
    { skill: 'Create', value: profile?.creativity || 85 },
  ];

  const progressData = [
    { week: 'W1', score: 45 }, { week: 'W2', score: 52 },
    { week: 'W3', score: 58 }, { week: 'W4', score: 63 },
    { week: 'W5', score: 70 }, { week: 'W6', score: 75 },
    { week: 'W7', score: assessment?.total_score || 78 },
  ];

  const recentActivities = [
    { icon: ClipboardCheck, text: 'Completed skill assessment', time: '2 hours ago', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { icon: User, text: 'Updated profile information', time: '5 hours ago', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { icon: Target, text: 'Career predictions updated', time: '1 day ago', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { icon: BookOpen, text: 'Started new learning module', time: '2 days ago', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  ];

  const profileCompletion = profile?.profile_completion || 65;
  const cgpa = profile?.cgpa || 0;
  const topCareer = careerData?.top_careers?.[0];
  const unreadNotifs = notifications.filter((n: any) => !n.is_read).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 pb-12 font-sans"
    >
      {/* ── Welcome Card ── */}
      <motion.div variants={itemVariants} className="relative rounded-[2rem] overflow-hidden bg-[#0d1017] border border-slate-800/60 shadow-2xl">
        {/* Background ambient light */}
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[150%] bg-indigo-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[100%] bg-purple-500/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-8 p-8 md:p-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EduVerse Operating System Active</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Welcome back, {user?.name || 'Ravi'}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Your profile is optimized for <strong className="text-white font-bold">College Undergrad</strong> targeting a career as an <strong className="text-indigo-400 font-bold">AI & ML Engineer</strong>.
            </p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-4 shrink-0">
            <div className="flex-1 sm:flex-none px-6 py-5 rounded-2xl bg-[#151923]/80 border border-slate-700/50 flex flex-col justify-center min-w-[140px] shadow-inner backdrop-blur-xl hover:bg-[#1a1f2e] transition-colors">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2 text-center">Habit Streak</span>
              <span className="text-2xl font-black text-amber-500 font-display flex items-center justify-center gap-1.5">
                🔥 12 Days
              </span>
            </div>
            <div className="flex-1 sm:flex-none px-6 py-5 rounded-2xl bg-[#151923]/80 border border-slate-700/50 flex flex-col justify-center min-w-[140px] shadow-inner backdrop-blur-xl hover:bg-[#1a1f2e] transition-colors">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-2 text-center">Task Focus</span>
              <span className="text-3xl font-black text-white font-display text-center">
                0/3
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Cards Row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div onClick={() => setActiveTab('student-profile')} className="glass-card p-5 cursor-pointer group flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500"><User className="w-5 h-5" /></div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider">Profile</p>
              <p className="text-2xl font-bold font-display text-[var(--text-primary)]">{profileCompletion}%</p>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${profileCompletion}%` }} />
            </div>
          </div>
        </div>

        {/* Academic Status */}
        <div className="glass-card p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"><GraduationCap className="w-5 h-5" /></div>
            <span className="text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full font-bold">Academic</span>
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-1">Current Sem</p>
            <p className="text-2xl font-bold font-display text-[var(--text-primary)]">{profile?.semester ? `Sem ${profile.semester}` : 'Sem 5'}</p>
          </div>
        </div>

        {/* Learning Assessment */}
        <div onClick={() => setActiveTab('assessment')} className="glass-card p-5 cursor-pointer group flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500"><TrendingUp className="w-5 h-5" /></div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-1">Next Test</p>
            <p className="text-lg font-bold font-display text-[var(--text-primary)] truncate">Cognitive Basics</p>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Due in 3 days</p>
          </div>
        </div>

        {/* Notifications */}
        <div onClick={() => setActiveTab('notifications')} className="glass-card p-5 cursor-pointer group flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 relative">
              <Bell className="w-5 h-5" />
              {(unreadNotifs > 0 || true) && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-[var(--card-bg)] rounded-full"></span>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div>
            <p className="text-xs text-[var(--text-secondary)] uppercase font-bold tracking-wider mb-1">Alerts</p>
            <p className="text-2xl font-bold font-display text-[var(--text-primary)]">{unreadNotifs || 2} New</p>
          </div>
        </div>
      </motion.div>

      {/* ── Main Grid: Skill Radar + Learning Progress ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10"><BarChart3 className="w-5 h-5 text-indigo-500" /></div>
              <h3 className="text-base font-bold font-display text-[var(--text-primary)]">Skill Competency</h3>
            </div>
            <button onClick={() => setActiveTab('student-profile')} className="text-xs text-indigo-500 font-semibold hover:text-indigo-600 transition-colors">Edit Skills</button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skillData}>
                <PolarGrid stroke="var(--card-border)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }} />
                <Radar name="Skills" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Learning Progress Area Chart */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10"><TrendingUp className="w-5 h-5 text-emerald-500" /></div>
              <h3 className="text-base font-bold font-display text-[var(--text-primary)]">Growth Trajectory</h3>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--text-secondary)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* ── Predictions Row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Predictions */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10"><Target className="w-5 h-5 text-purple-500" /></div>
              <h3 className="text-base font-bold font-display text-[var(--text-primary)]">Top Career Matches</h3>
            </div>
            <button onClick={() => setActiveTab('career-prediction')} className="text-xs text-indigo-500 font-semibold flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Explore <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Data Scientist', salary: '₹12L - ₹24L', match: 94 },
              { title: 'Machine Learning Engineer', salary: '₹15L - ₹30L', match: 88 },
              { title: 'Full Stack Developer', salary: '₹8L - ₹18L', match: 82 }
            ].map((career, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-primary)] hover:border-purple-200 dark:hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">{career.title}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{career.salary}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-purple-600 dark:text-purple-400">{career.match}%</p>
                  <p className="text-[9px] text-[var(--text-secondary)] uppercase font-bold tracking-wider">Match</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Persona */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10"><Brain className="w-5 h-5 text-amber-500" /></div>
              <h3 className="text-base font-bold font-display text-[var(--text-primary)]">AI Learning Persona</h3>
            </div>
            <button onClick={() => setActiveTab('learning-persona-page')} className="text-xs text-indigo-500 font-semibold flex items-center gap-1 hover:text-indigo-600 transition-colors">
              Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="shrink-0 relative">
              <ProgressCircle percentage={92} size={100} strokeWidth={8} color="#f59e0b" />
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-5">Match</span>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold font-display text-[var(--text-primary)] mb-1">The Analytical Architect</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                You excel at breaking down complex problems logically and prefer structured, hands-on project-based learning over theory.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Visual Learner', 'Problem Solver', 'Deep Focus'].map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 text-[10px] bg-[var(--bg-secondary)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-full font-semibold shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom Row ── */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10"><Activity className="w-5 h-5 text-emerald-500" /></div>
            <h3 className="text-base font-bold font-display text-[var(--text-primary)]">Activity Feed</h3>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => {
              const Icon = activity.icon;
              return (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${activity.bg} ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{activity.text}</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10"><Zap className="w-5 h-5 text-blue-500" /></div>
            <h3 className="text-base font-bold font-display text-[var(--text-primary)]">Shortcuts</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'assessment', label: 'Take Assessment', icon: ClipboardCheck },
              { id: 'career-explorer', label: 'Career Explorer', icon: Award },
              { id: 'study-planner', label: 'Study Planner', icon: BookOpen },
              { id: 'student-profile', label: 'Update Profile', icon: User }
            ].map(action => (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.id)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg-primary)] hover:border-indigo-300 hover:shadow-sm dark:hover:border-indigo-500/30 transition-all text-sm font-semibold text-[var(--text-primary)]"
              >
                <div className="flex items-center gap-3">
                  <action.icon className="w-4 h-4 text-[var(--text-secondary)]" />
                  {action.label}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

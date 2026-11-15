import React, { useState, useEffect } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { Sparkles, User, ShieldCheck, ArrowLeft, Loader2, CheckSquare, Square, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

// ── Social Provider SVG Icons ─────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onSuccess }) => {
  const { login, signup } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('School Student');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [showForgotMsg, setShowForgotMsg] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('eduverse_name');
    const savedRole = localStorage.getItem('eduverse_role') as UserRole | null;
    if (savedName) setName(savedName);
    if (savedRole && ['School Student','Diploma Student','Undergraduate Student','Postgraduate Student','Graduate','Working Professional','Admin'].includes(savedRole)) setRole(savedRole);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp && !name) { setError('Please enter your full name.'); setLoading(false); return; }
      if (!email || !password) { setError('Please enter your email and password.'); setLoading(false); return; }
      if (isSignUp) { await signup(name, email, role); } else { await login(email, '', role); }
      if (rememberMe) { localStorage.setItem('eduverse_name', name); localStorage.setItem('eduverse_role', role); }
      else { localStorage.removeItem('eduverse_name'); localStorage.removeItem('eduverse_role'); }
      onSuccess();
    } catch { setError('Invalid credentials. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleSocialLogin = async (provider: 'Google' | 'GitHub' | 'LinkedIn') => {
    setSocialLoading(provider);
    setError('');
    await new Promise(r => setTimeout(r, 1400));
    const mockProfiles: Record<string, { name: string; email: string }> = {
      Google:   { name: 'Google User',   email: 'user.google@gmail.com' },
      GitHub:   { name: 'GitHub User',   email: 'user.github@outlook.com' },
      LinkedIn: { name: 'LinkedIn User', email: 'user.linkedin@outlook.com' },
    };
    const profile = mockProfiles[provider];
    try {
      await login(profile.email, profile.name, role);
      if (rememberMe) { localStorage.setItem('eduverse_name', profile.name); localStorage.setItem('eduverse_role', role); }
      onSuccess();
    } catch { setError(`${provider} sign-in failed. Please try email login.`); }
    finally { setSocialLoading(null); }
  };

  const availableRoles = [
    { id: 'School Student' as UserRole, label: 'School Student', icon: '🎓' },
    { id: 'Undergraduate Student' as UserRole, label: 'UG Student', icon: '🏫' },
    { id: 'Graduate' as UserRole, label: 'Graduate', icon: '👨‍💼' },
    { id: 'Working Professional' as UserRole, label: 'Professional', icon: '💼' },
    { id: 'Postgraduate Student' as UserRole, label: 'PG Student', icon: '🎯' },
    { id: 'Admin' as UserRole, label: 'Admin', icon: '⚙️' },
  ];

  const socialProviders = [
    {
      id: 'Google' as const,
      label: 'Continue with Google',
      icon: <GoogleIcon />,
      hoverClass: 'hover:border-[#4285F4]/50 hover:bg-[#4285F4]/5 hover:text-white',
      spinColor: 'text-[#4285F4]',
      dotColor: 'bg-[#4285F4]',
    },
    {
      id: 'GitHub' as const,
      label: 'Continue with GitHub',
      icon: <GitHubIcon />,
      hoverClass: 'hover:border-slate-400/50 hover:bg-slate-400/5 hover:text-white',
      spinColor: 'text-slate-300',
      dotColor: 'bg-slate-400',
    },
    {
      id: 'LinkedIn' as const,
      label: 'Continue with LinkedIn',
      icon: <LinkedInIcon />,
      hoverClass: 'hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5 hover:text-white',
      spinColor: 'text-[#0A66C2]',
      dotColor: 'bg-[#0A66C2]',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[25%] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--card-bg)] border border-[var(--card-border)] hover:shadow-md transition text-sm cursor-pointer z-20"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md glass-panel p-8 md:p-10 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-3 shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl font-black font-display tracking-tight text-[var(--text-primary)]">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            {isSignUp ? 'Join the next generation of learners' : 'Sign in to your educational command center'}
          </p>
        </div>

        {/* Error / Success banners */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 font-medium text-center">
            {error}
          </motion.div>
        )}
        {showForgotMsg && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm text-emerald-400 font-medium text-center">
            Password reset link sent to your email! ✉️
          </motion.div>
        )}

        {/* ── SOCIAL LOGIN ──────────────────────────────────────────────────── */}
        <div className="space-y-2.5 mb-6">
          {socialProviders.map((provider, i) => (
            <motion.button
              key={provider.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              disabled={!!socialLoading || loading}
              onClick={() => handleSocialLogin(provider.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-secondary)] text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group ${provider.hoverClass}`}
            >
              {socialLoading === provider.id ? (
                <>
                  <Loader2 className={`w-5 h-5 animate-spin ${provider.spinColor} shrink-0`} />
                  <span className="flex-1 text-left">Connecting to {provider.id}…</span>
                  <span className={`w-2 h-2 rounded-full ${provider.dotColor} animate-pulse`} />
                </>
              ) : (
                <>
                  {provider.icon}
                  <span className="flex-1 text-left">{provider.label}</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[var(--card-border)]" />
          <span className="text-[10px] font-black text-[var(--text-secondary)]/60 uppercase tracking-[0.15em] whitespace-nowrap">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-[var(--card-border)]" />
        </div>

        {/* ── EMAIL FORM ─────────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Account Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableRoles.map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer text-sm
                    ${role === r.id
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10'
                      : 'bg-[var(--bg-primary)] border-[var(--card-border)] text-[var(--text-secondary)] hover:border-slate-600 hover:text-[var(--text-primary)]'}`}
                >
                  <span className="text-xl">{r.icon}</span>
                  <span className="text-xs font-semibold">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--text-secondary)]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" required={isSignUp} value={name} onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full glass-input !pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full glass-input !pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[var(--text-secondary)]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full glass-input !pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer">
                  {rememberMe ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-500" />}
                </button>
                <span className="text-sm text-[var(--text-secondary)] cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
                  Remember me
                </span>
              </div>
              <button type="button" onClick={() => { setShowForgotMsg(true); setTimeout(() => setShowForgotMsg(false), 4000); }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full py-3.5 mt-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all font-bold text-white rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ShieldCheck className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--card-border)] pt-5">
          <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors cursor-pointer"
          >
            {isSignUp ? 'Log In' : 'Sign Up Free'}
          </button>
        </div>

        <p className="text-center text-[10px] text-[var(--text-secondary)]/40 mt-4 leading-relaxed">
          By signing in, you agree to EduVerse AI's{' '}
          <span className="text-indigo-400/70 cursor-pointer hover:text-indigo-400 transition-colors">Terms of Service</span>{' '}
          and{' '}
          <span className="text-indigo-400/70 cursor-pointer hover:text-indigo-400 transition-colors">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
};

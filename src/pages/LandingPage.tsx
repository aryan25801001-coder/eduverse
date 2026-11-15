import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Compass, Zap, Trophy, ChevronRight, HelpCircle, GraduationCap, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "400+", label: "Verified Careers" },
    { value: "98%", label: "Prediction Accuracy" },
    { value: "₹18L+", label: "Avg CTC Offered" }
  ];

  const features = [
    { icon: Compass, title: "Career Exploration", desc: "Discover data-backed career paths tailored to your cognitive persona and skills." },
    { icon: Zap, title: "AI Learning Persona", desc: "Understand how you learn best. Get personalized study strategies and roadmaps." },
    { icon: Trophy, title: "Skill Assessment", desc: "Take adaptive tests to evaluate your strengths, weaknesses, and readiness for jobs." },
  ];

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      {/* Background gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 dark:bg-[#030014]/70 backdrop-blur-xl border-b border-[var(--card-border)]' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-[var(--text-primary)]">EduVerse<span className="text-indigo-500">.ai</span></span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition">Product</a>
            <a href="#journey" className="hover:text-[var(--text-primary)] transition">Solutions</a>
            <a href="#pricing" className="hover:text-[var(--text-primary)] transition">Pricing</a>
          </nav>
          <div className="flex gap-4">
            <button onClick={onLogin} className="px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">Sign In</button>
            <button onClick={onStart} className="px-5 py-2 text-sm font-bold bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-lg hover:opacity-90 transition shadow-lg">Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-semibold mb-8 border border-indigo-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Introducing Persona-Driven AI</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight mb-6">
            Predict your <span className="text-gradient">Career Path</span> with Artificial Intelligence.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-sans leading-relaxed mb-10">
            EduVerse analyzes your cognitive abilities and learning persona to recommend the optimal educational timeline, colleges, and dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStart} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-xl shadow-indigo-500/25">
              Start Free Assessment <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onLogin} className="px-8 py-4 glass-card font-bold flex items-center justify-center gap-2 hover:bg-[var(--bg-secondary)] transition">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-24 relative max-w-5xl mx-auto">
          <div className="glass-panel p-2 rounded-2xl overflow-hidden">
            <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--card-border)] overflow-hidden shadow-2xl">
              <div className="h-8 border-b border-[var(--card-border)] flex items-center px-4 gap-2 bg-[var(--bg-primary)]">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] relative">
                {/* Mockup content */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 animate-pulse">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">Your Profile is 85% Complete</h3>
                <p className="text-[var(--text-secondary)]">Take the final AI cognitive test to unlock career predictions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-[var(--card-border)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold font-display text-[var(--text-primary)] mb-1">{stat.value}</p>
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">An entire OS for your education</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">Replace disjointed tools with a unified platform designed to accelerate learning and job readiness.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <Card key={i} hoverable className="flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <feat.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feat.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="glass-panel p-12 text-center rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5" />
          <h2 className="text-4xl font-extrabold font-display mb-6 relative z-10">Ready to find your path?</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto relative z-10">Join thousands of students who have discovered their true learning persona and secured their dream careers.</p>
          <button onClick={onStart} className="px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold rounded-xl hover:scale-105 transition duration-300 relative z-10 inline-flex items-center gap-2">
            Get Started For Free <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--card-border)] text-center text-[var(--text-secondary)] text-sm">
        <p>© 2026 EduVerse AI. Designed for modern students.</p>
      </footer>
    </div>
  );
};

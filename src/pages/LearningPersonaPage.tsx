/**
 * Learning Persona Page — Phase 2
 * Displays persona name, description, strengths, weaknesses,
 * recommended learning strategy, study methods, career suitability,
 * progress score, and confidence percentage with Progress Circles.
 */
import React, { useState, useEffect } from 'react';
import { predictionAPI } from '../services/api';
import { ProgressCircle } from '../components/ProgressCircle';
import { CardSkeleton } from '../components/LoadingSkeleton';
import {
  Brain, Sparkles, ShieldAlert, Target, BookOpen, Lightbulb,
  Award, TrendingUp, RefreshCw, CheckCircle2, Zap
} from 'lucide-react';

export const LearningPersonaPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [persona, setPersona] = useState<any>(null);

  useEffect(() => {
    fetchPersona();
  }, []);

  const fetchPersona = async () => {
    setLoading(true);
    try {
      const res = await predictionAPI.getPersona();
      setPersona(res.data);
    } catch (err) {
      // Fallback sample persona
      setPersona({
        persona_name: "The Analytical Architect 🏗️",
        description: "You are a systematic thinker who excels at breaking down complex problems into logical components. You thrive in structured environments.",
        strengths: ["Algorithmic Thinking", "Systematic Problem Solving", "Technical Depth", "Pattern Recognition"],
        weaknesses: ["May overlook creative alternatives", "Can be over-analytical", "Needs soft skills practice"],
        recommended_learning_strategy: "Project-based learning with incremental complexity. Start with core principles before diving into implementations.",
        best_study_methods: ["Coding tutorials", "Building personal projects", "Competitive programming", "Technical docs reading"],
        career_suitability: ["Software Engineer", "AI/ML Engineer", "Data Scientist", "Backend Developer"],
        progress_score: 78.5,
        confidence_percentage: 92.0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CardSkeleton />;

  return (
    <div className="space-y-8 font-sans">
      {/* Persona Header Banner */}
      <div className="relative p-6 lg:p-8 rounded-3xl overflow-hidden glass-panel border border-purple-500/20 bg-purple-500/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Learning Persona Analysis
            </div>
            <h2 className="text-3xl font-bold font-display text-white">{persona?.persona_name || 'Loading Persona...'}</h2>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">{persona?.description}</p>
          </div>

          <div className="flex items-center gap-6">
            <ProgressCircle
              percentage={persona?.progress_score || 0}
              size={110}
              strokeWidth={8}
              color="#8b5cf6"
              label="Progress Score"
            />
            <ProgressCircle
              percentage={persona?.confidence_percentage || 0}
              size={110}
              strokeWidth={8}
              color="#00f2fe"
              label="AI Confidence"
            />
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" /> Core Strengths
          </h3>
          <div className="space-y-2">
            {persona?.strengths?.map((str: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-emerald-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-200 font-medium">{str}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses / Growth Areas */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <ShieldAlert className="w-4.5 h-4.5 text-rose-400" /> Growth Areas
          </h3>
          <div className="space-y-2">
            {persona?.weaknesses?.map((weak: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-rose-500/10">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-xs text-slate-200 font-medium">{weak}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Learning Strategy */}
      <div className="glass-panel p-6 rounded-3xl border border-brand-blue/20 bg-brand-blue/5 space-y-4">
        <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
          <Lightbulb className="w-4.5 h-4.5 text-brand-blue" /> Recommended Learning Strategy
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">{persona?.recommended_learning_strategy}</p>
      </div>

      {/* Best Study Methods & Career Suitability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Study Methods */}
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-amber-400" /> Best Study Methods
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {persona?.best_study_methods?.map((method: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-300 font-semibold flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> {method}
              </div>
            ))}
          </div>
        </div>

        {/* Career Suitability */}
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Target className="w-4.5 h-4.5 text-purple-400" /> High Career Suitability
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {persona?.career_suitability?.map((career: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-bold flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-purple-400" /> {career}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Assessment Page — Phase 2
 * Multi-section MCQ assessment with 10 professional categories:
 * Academic, Learning Style, Personality, Programming, Problem Solving,
 * Communication, Leadership, Creativity, Logical Reasoning, Critical Thinking.
 */
import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { assessmentAPI, predictionAPI } from '../services/api';
import { CardSkeleton } from '../components/LoadingSkeleton';
import {
  ClipboardCheck, CheckCircle2, ChevronRight, ChevronLeft, Send,
  Award, Sparkles, Loader2, RefreshCw, BarChart2
} from 'lucide-react';

export const AssessmentPage: React.FC = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questionsBySection, setQuestionsBySection] = useState<Record<string, any[]>>({});
  const [sections, setSections] = useState<string[]>([]);
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, rRes] = await Promise.allSettled([
        assessmentAPI.getQuestions(),
        assessmentAPI.getResult(),
      ]);

      if (qRes.status === 'fulfilled' && qRes.value.data?.sections) {
        setQuestionsBySection(qRes.value.data.sections);
        setSections(Object.keys(qRes.value.data.sections));
      }

      if (rRes.status === 'fulfilled' && rRes.value.data?.result) {
        setResult(rRes.value.data.result);
      }
    } catch (err) {
      showToast('error', 'Error', 'Failed to load assessment questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(([qId, optIdx]) => ({
      question_id: qId,
      selected_option: optIdx,
    }));

    if (formattedAnswers.length === 0) {
      showToast('warning', 'No Answers', 'Please answer at least a few questions before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await assessmentAPI.submit(formattedAnswers);
      setResult(res.data);
      // Trigger prediction regeneration in background
      await predictionAPI.regenerate();
      showToast('success', 'Assessment Submitted!', 'Your scores have been evaluated and career predictions updated.');
    } catch (err) {
      showToast('error', 'Submission Failed', 'Could not submit assessment. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CardSkeleton />;

  const currentSection = sections[currentSectionIdx];
  const currentQuestions = questionsBySection[currentSection] || [];

  // Total questions count
  const totalQuestions = Object.values(questionsBySection).reduce((acc, q) => acc + q.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div className="space-y-8 font-sans">
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-widest mb-1">
            <ClipboardCheck className="w-4 h-4" /> Comprehensive Evaluation
          </div>
          <h2 className="text-2xl font-bold font-display text-white">AI Skill & Persona Assessment</h2>
          <p className="text-slate-400 text-xs mt-1">Answer questions across 10 core modules to generate your AI Learning Persona & Career Predictions.</p>
        </div>
        {result && (
          <button
            onClick={() => setResult(null)}
            className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-xl hover:bg-brand-blue/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retake Assessment
          </button>
        )}
      </div>

      {/* Result Overview if completed */}
      {result && result.section_scores && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Assessment Complete</span>
              <h3 className="text-xl font-bold text-white font-display">Overall Score: {result.total_score}%</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(result.section_scores).map(([sec, score]: [string, any]) => (
              <div key={sec} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center">
                <span className="text-[10px] text-slate-400 block truncate">{sec}</span>
                <span className="text-base font-bold text-emerald-400 font-display">{score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/[0.04] space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Assessment Progress</span>
          <span className="text-brand-blue font-bold">{answeredCount} of {totalQuestions} answered ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Section Nav Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((sec, idx) => {
          const secQuestions = questionsBySection[sec] || [];
          const secAnswered = secQuestions.filter(q => answers[q.id] !== undefined).length;
          const isComplete = secAnswered === secQuestions.length && secQuestions.length > 0;

          return (
            <button
              key={sec}
              onClick={() => setCurrentSectionIdx(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                currentSectionIdx === idx
                  ? 'bg-brand-blue text-[#030014] font-bold shadow-lg shadow-brand-blue/20'
                  : isComplete
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white/[0.01] text-slate-400 border border-white/[0.04] hover:bg-white/[0.03]'
              }`}
            >
              {isComplete && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>{sec}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-black/20">{secAnswered}/{secQuestions.length}</span>
            </button>
          );
        })}
      </div>

      {/* Questions Card */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-white/[0.04] space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-4">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-blue" /> Module: {currentSection}
          </h3>
          <span className="text-xs text-slate-500">Section {currentSectionIdx + 1} of {sections.length}</span>
        </div>

        <div className="space-y-8">
          {currentQuestions.map((q: any, qIdx: number) => (
            <div key={q.id} className="space-y-3 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03]">
              <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                <span className="text-brand-blue font-bold mr-2">Q{qIdx + 1}.</span> {q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((option: string, optIdx: number) => {
                  const isSelected = answers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-brand-blue/15 border-brand-blue text-white font-medium'
                          : 'bg-white/[0.02] border-white/[0.04] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{option}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand-blue bg-brand-blue' : 'border-slate-600'}`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-[#030014] rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-800/60">
          <button
            onClick={() => setCurrentSectionIdx(prev => Math.max(0, prev - 1))}
            disabled={currentSectionIdx === 0}
            className="px-4 py-2 bg-white/[0.02] border border-white/[0.04] rounded-xl text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Module
          </button>

          {currentSectionIdx < sections.length - 1 ? (
            <button
              onClick={() => setCurrentSectionIdx(prev => Math.min(sections.length - 1, prev + 1))}
              className="px-5 py-2.5 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-xl text-xs font-semibold hover:bg-brand-blue/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              Next Module <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 bg-gradient-to-tr from-brand-blue to-brand-purple text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-blue/20 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

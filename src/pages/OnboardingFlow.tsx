import React, { useState, useMemo } from 'react';
import { useAuth, UserRole } from '../context/AuthContext';
import { Sparkles, ArrowRight, ArrowLeft, GraduationCap, BrainCircuit, Eye, Award, CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

// Configuration options dynamically determined by the logged-in User's Role
interface RoleConfig {
  gradeLevels: string[];
  streams: { id: string; name: string; desc: string }[];
  ugCourses?: Record<string, { id: string; label: string; desc: string }[]>;
  subjects?: Record<string, { id: string; label: string }[]>;
  interests: Record<string, { id: string; label: string }[]>;
  careerGoals: Record<string, { name: string; desc: string }[]>;
}

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  'School Student': {
    gradeLevels: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    streams: [
      { id: 'science-pcm', name: 'Science (PCM)', desc: 'Physics, Chemistry, Mathematics' },
      { id: 'science-pcb', name: 'Science (PCB)', desc: 'Physics, Chemistry, Biology' },
      { id: 'commerce', name: 'Commerce', desc: 'Accounts, Business Studies, Economics' },
      { id: 'humanities', name: 'Humanities / Arts', desc: 'History, Political Science, Sociology' }
    ],
    subjects: {
      'science-pcm': [{ id: 'phy', label: 'Physics' }, { id: 'chem', label: 'Chemistry' }, { id: 'math', label: 'Maths' }],
      'science-pcb': [{ id: 'phy', label: 'Physics' }, { id: 'chem', label: 'Chemistry' }, { id: 'bio', label: 'Biology' }],
      'commerce': [{ id: 'acc', label: 'Accounts' }, { id: 'bst', label: 'Business Studies' }, { id: 'eco', label: 'Economics' }],
      'humanities': [{ id: 'hist', label: 'History' }, { id: 'pol', label: 'Pol. Science' }, { id: 'soc', label: 'Sociology' }]
    },
    interests: {
      'science-pcm': [{ id: 'coding', label: 'Basic Programming' }, { id: 'robotics', label: 'Robotics & Hardware' }, { id: 'space', label: 'Astronomy & Space' }],
      'science-pcb': [{ id: 'medicine', label: 'Biology & Medical Science' }, { id: 'pharma', label: 'Pharmacy & Biotech' }, { id: 'nature', label: 'Ecology & Environment' }],
      'commerce': [{ id: 'business', label: 'Business & Startups' }, { id: 'stocks', label: 'Stock Markets' }, { id: 'accounting', label: 'Bookkeeping' }],
      'humanities': [{ id: 'civics', label: 'Public Policy & Politics' }, { id: 'law', label: 'Law & Justice' }, { id: 'literature', label: 'Creative Writing' }]
    },
    careerGoals: {
      'science-pcm': [{ name: 'Software Engineer', desc: 'Code systems and construct applications' }, { name: 'Architect', desc: 'Design buildings and structural frameworks' }],
      'science-pcb': [{ name: 'Doctor / Surgeon', desc: 'Diagnose and treat medical patients' }, { name: 'Biotechnologist', desc: 'Apply biology to develop products' }],
      'commerce': [{ name: 'Chartered Accountant', desc: 'Manage tax compliance and corporate accounts' }, { name: 'Business Analyst', desc: 'Examine business data and processes' }],
      'humanities': [{ name: 'Civil Servant', desc: 'Work in district administration / policy' }, { name: 'Lawyer', desc: 'Represent clients and interpret laws' }]
    }
  },
  'Diploma Student': {
    gradeLevels: ['1st Year', '2nd Year', '3rd Year'],
    streams: [
      { id: 'cs-diploma', name: 'Computer Engineering', desc: 'Software, Networks, Web Development' },
      { id: 'mech-diploma', name: 'Mechanical Engineering', desc: 'Thermodynamics, CAD/CAM, Auto' },
      { id: 'civil-diploma', name: 'Civil Engineering', desc: 'Structures, Surveying, Construction' }
    ],
    interests: {
      'cs-diploma': [{ id: 'webdev', label: 'Web Development' }, { id: 'networks', label: 'Networking & Security' }],
      'mech-diploma': [{ id: 'auto', label: 'Automotive Design' }, { id: 'cad', label: '3D CAD Modeling' }],
      'civil-diploma': [{ id: 'survey', label: 'Site Surveying' }, { id: 'materials', label: 'Building Materials' }]
    },
    careerGoals: {
      'cs-diploma': [{ name: 'Junior Frontend Developer', desc: 'Build responsive and premium interfaces' }, { name: 'Network Admin', desc: 'Configure servers and secure infrastructure' }],
      'mech-diploma': [{ name: 'CAD Draftsman', desc: 'Generate blueprints and engineering models' }, { name: 'QA Engineer', desc: 'Maintain quality checks on factory floors' }],
      'civil-diploma': [{ name: 'Site Supervisor', desc: 'Oversee construction operations on sites' }, { name: 'Estimator', desc: 'Calculate project budgets and material requirements' }]
    }
  },
  'Undergraduate Student': {
    gradeLevels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    streams: [
      { id: 'btech-cse', name: 'Computer Science (B.Tech/BCA)', desc: 'DSA, Web Dev, Databases, AI' },
      { id: 'bcom-finance', name: 'Finance / Commerce (B.Com/BBA)', desc: 'Economics, Corporate Law, Accounting' },
      { id: 'ba-arts', name: 'Liberal Arts & Humanities', desc: 'Psychology, Literature, Journalism' }
    ],
    interests: {
      'btech-cse': [{ id: 'ai-ml', label: 'Artificial Intelligence & ML' }, { id: 'fullstack', label: 'Fullstack Development' }, { id: 'cloud', label: 'Cloud Solutions (AWS/Azure)' }],
      'bcom-finance': [{ id: 'investment', label: 'Investment Banking' }, { id: 'consulting', label: 'Management Consulting' }, { id: 'fintech', label: 'Fintech Products' }],
      'ba-arts': [{ id: 'ux', label: 'UX / Product Design' }, { id: 'journalism', label: 'Media & Communications' }, { id: 'psych', label: 'Behavioral Psychology' }]
    },
    careerGoals: {
      'btech-cse': [{ name: 'AI & ML Engineer', desc: 'Design deep learning algorithms and predictive models' }, { name: 'Fullstack Dev', desc: 'Construct web applications from databases to UI' }],
      'bcom-finance': [{ name: 'Investment Banker', desc: 'Handle capital raising and corporate finance/M&A' }, { name: 'Financial Analyst', desc: 'Evaluate equity markets and corporate portfolios' }],
      'ba-arts': [{ name: 'UX Designer', desc: 'Build intuitive interfaces using design thinking' }, { name: 'Digital Journalist', desc: 'Write and edit online media stories' }]
    }
  },
  'Postgraduate Student': {
    gradeLevels: ['1st Year', '2nd Year'],
    streams: [
      { id: 'mtech-cs', name: 'Advanced Computer Science', desc: 'Transformers, Distributed Systems' },
      { id: 'mba-mgmt', name: 'Business Administration (MBA)', desc: 'Strategic Finance, HR, Operations' }
    ],
    interests: {
      'mtech-cs': [{ id: 'research', label: 'Deep Learning Research' }, { id: 'dist-sys', label: 'Distributed Architectures' }],
      'mba-mgmt': [{ id: 'strategy', label: 'Corporate Strategy' }, { id: 'ops', label: 'Supply Chain Operations' }]
    },
    careerGoals: {
      'mtech-cs': [{ name: 'AI Research Scientist', desc: 'Conduct novel research in deep learning and NLP' }, { name: 'Systems Architect', desc: 'Plan scalable enterprise software systems' }],
      'mba-mgmt': [{ name: 'Management Consultant', desc: 'Advise executives on strategic business issues' }, { name: 'Product Manager', desc: 'Own product strategy, development and launch' }]
    }
  },
  'Graduate': {
    gradeLevels: ['Job Hunting', 'Preparing for PG', 'Freelance Phase'],
    streams: [
      { id: 'tech-grad', name: 'Tech & Engineering Graduate', desc: 'FastAPI, React, System Design' },
      { id: 'non-tech-grad', name: 'Commerce & Humanities Graduate', desc: 'Marketing, Operations, HR' }
    ],
    interests: {
      'tech-grad': [{ id: 'dsa', label: 'DSA & Leetcode Prep' }, { id: 'projects', label: 'Fullstack Portfolio Projects' }],
      'non-tech-grad': [{ id: 'marketing', label: 'SEO & Brand Strategy' }, { id: 'ops', label: 'Data Management' }]
    },
    careerGoals: {
      'tech-grad': [{ name: 'Software Engineer', desc: 'Construct microservices and cloud backends' }],
      'non-tech-grad': [{ name: 'Marketing Specialist', desc: 'Drive customer acquisition and campaigns' }]
    }
  },
  'Working Professional': {
    gradeLevels: ['Junior (0-2 Yrs)', 'Mid-level (3-5 Yrs)', 'Senior (5+ Yrs)'],
    streams: [
      { id: 'tech-pro', name: 'Software & Technology', desc: 'Kubernetes, Scale Architectures, DevOps' },
      { id: 'mgmt-pro', name: 'Leadership & Strategy', desc: 'Strategic Finance, MBA, PM Tracks' }
    ],
    interests: {
      'tech-pro': [{ id: 'system-design', label: 'High-Scale System Design' }, { id: 'mlops', label: 'MLOps & Model Deployment' }],
      'mgmt-pro': [{ id: 'vp-track', label: 'Executive MBA & Strategy' }, { id: 'product', label: 'Product Growth Analytics' }]
    },
    careerGoals: {
      'tech-pro': [{ name: 'Software Architect', desc: 'Design robust and fault-tolerant architectures' }, { name: 'CTO / Director', desc: 'Define tech strategies and manage dev teams' }],
      'mgmt-pro': [{ name: 'VP of Product', desc: 'Drive enterprise product pipelines' }, { name: 'Management Consultant', desc: 'Solve complex corporate operations problems' }]
    }
  },
  'Admin': {
    gradeLevels: ['Platform Admin'],
    streams: [{ id: 'platform-control', name: 'Operations', desc: 'Database Administration, Audits' }],
    interests: { 'platform-control': [{ id: 'audit', label: 'Security Auditing' }] },
    careerGoals: { 'platform-control': [{ name: 'Platform Director', desc: 'Administer all systems' }] }
  }
};

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { completeOnboarding, user } = useAuth();
  const userRole = user?.role || 'School Student';
  const config = useMemo(() => ROLE_CONFIGS[userRole], [userRole]);

  const [step, setStep] = useState(1);

  // Dynamic Form States
  const [classLevel, setClassLevel] = useState(config.gradeLevels[0]);
  const [stream, setStream] = useState(config.streams[0].id);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [learningStyle, setLearningStyle] = useState('Visual');
  const [personality, setPersonality] = useState('Analytical');
  const [careerGoal, setCareerGoal] = useState('');

  // Handle stream change safely
  const handleStreamChange = (newStream: string) => {
    setStream(newStream);
    setSelectedInterests([]);
    setCareerGoal('');
  };

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      const activeCareers = config.careerGoals[stream] || [];
      const finalCareerGoal = careerGoal || activeCareers[0]?.name || 'Technology';

      completeOnboarding({
        classLevel,
        stream,
        interests: selectedInterests,
        learningStyle,
        personality,
        careerGoal: finalCareerGoal
      });
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // Get active lists based on state
  const activeInterests = useMemo(() => config.interests[stream] || [], [config, stream]);
  const activeCareers = useMemo(() => config.careerGoals[stream] || [], [config, stream]);
  const activeSubjects = useMemo(() => (config.subjects ? config.subjects[stream] : null), [config, stream]);

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-xl bg-[#0d1117] border border-slate-800/60 rounded-3xl p-8 relative z-10 shadow-2xl">
        {/* Progress bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* ── Step 1: Grade / Level + Stream Selection ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 1 of 5</span>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <GraduationCap className="w-5.5 h-5.5 text-indigo-400" />
                Select Your Level
              </h2>
              <p className="text-slate-400 text-xs">Based on your account role: <span className="text-indigo-400 font-bold">{userRole}</span></p>
            </div>

            {/* Level Selector */}
            <div className="grid grid-cols-2 gap-3">
              {config.gradeLevels.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setClassLevel(level)}
                  className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1
                    ${classLevel === level
                      ? 'bg-indigo-500/15 border-indigo-500 text-white'
                      : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <span className="text-xs font-bold">{level}</span>
                </button>
              ))}
            </div>

            {/* Stream Selector */}
            <div className="space-y-2 pt-4">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Select Your Specialization / Stream</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.streams.map(str => (
                  <button
                    key={str.id}
                    type="button"
                    onClick={() => handleStreamChange(str.id)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between
                      ${stream === str.id
                        ? 'bg-purple-500/15 border-purple-500 text-white'
                        : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <p className="text-sm font-bold">{str.name}</p>
                    <p className="text-[10px] text-slate-500 mt-2">{str.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Subjects Preview if configured */}
            {activeSubjects && (
              <div className="space-y-2 pt-3">
                <label className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-2">Subject Previews</label>
                <div className="flex flex-wrap gap-1.5">
                  {activeSubjects.map(sub => (
                    <span key={sub.id} className="px-2.5 py-1 text-[10px] bg-slate-900 border border-slate-800 text-slate-300 rounded-full">
                      {sub.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Adaptive Academic Interests ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 2 of 5</span>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <BrainCircuit className="w-5.5 h-5.5 text-indigo-400" />
                Select Interests
              </h2>
              <p className="text-slate-400 text-xs">Customize your roadmap with relevant learning topics.</p>
            </div>

            <div className="space-y-2">
              {activeInterests.map(int => {
                const isSelected = selectedInterests.includes(int.id);
                return (
                  <button
                    key={int.id}
                    onClick={() => handleInterestToggle(int.id)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition cursor-pointer
                      ${isSelected
                        ? 'bg-indigo-500/10 border-indigo-500 text-white'
                        : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <span className="text-xs font-semibold">{int.label}</span>
                    {isSelected && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />}
                  </button>
                );
              })}
              {activeInterests.length === 0 && (
                <p className="text-xs text-slate-500 italic">No specific interests defined. Proceed to the next step.</p>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3: Learning Style ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 3 of 5</span>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Eye className="w-5.5 h-5.5 text-indigo-400" />
                Select Learning Preference
              </h2>
              <p className="text-slate-400 text-xs">How do you retain complex concepts best?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Visual', desc: 'Infographics, video lectures, visual roadmaps' },
                { name: 'Auditory', desc: 'Podcasts, group debates, verbal briefs' },
                { name: 'Read / Write', desc: 'Textbooks, notes, interactive docs' },
                { name: 'Kinesthetic', desc: 'Hands-on projects, lab experiments' }
              ].map(style => (
                <button
                  key={style.name}
                  onClick={() => setLearningStyle(style.name)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-28
                    ${learningStyle === style.name
                      ? 'bg-indigo-500/10 border-indigo-500 text-white'
                      : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <p className="text-sm font-bold">{style.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-2">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Personality Type ── */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 4 of 5</span>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Award className="w-5.5 h-5.5 text-indigo-400" />
                Define Personality Type
              </h2>
              <p className="text-slate-400 text-xs">Select the profile description that fits your thinking style.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Analytical', desc: 'Data-driven, likes equations & structured models' },
                { name: 'Creative', desc: 'Visual designs, interfaces, artistic architecture' },
                { name: 'Social', desc: 'Management, leadership, team coordination' },
                { name: 'Logical', desc: 'Core problem-solving, algorithms, systematic thinking' }
              ].map(type => (
                <button
                  key={type.name}
                  onClick={() => setPersonality(type.name)}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between h-28
                    ${personality === type.name
                      ? 'bg-indigo-500/10 border-indigo-500 text-white'
                      : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <p className="text-sm font-bold">{type.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-2">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 5: Dynamic Target Career Goals ── */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Step 5 of 5</span>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <CheckCircle className="w-5.5 h-5.5 text-indigo-400" />
                Select Main Target Career
              </h2>
              <p className="text-slate-400 text-xs">Targeted careers optimized for your specialization.</p>
            </div>

            <div className="space-y-3">
              {activeCareers.map(goal => (
                <button
                  key={goal.name}
                  onClick={() => setCareerGoal(goal.name)}
                  className={`w-full p-4 rounded-xl border text-left transition cursor-pointer flex flex-col
                    ${careerGoal === goal.name
                      ? 'bg-indigo-500/10 border-indigo-500 text-white'
                      : 'bg-white/[0.01] border-slate-800 text-slate-400 hover:border-slate-700'}`}
                >
                  <span className="text-sm font-bold">{goal.name}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{goal.desc}</span>
                </button>
              ))}
              {activeCareers.length === 0 && (
                <p className="text-xs text-slate-500 italic">No default careers defined. Proceed to complete onboarding.</p>
              )}
            </div>
          </div>
        )}

        {/* Actions Buttons */}
        <div className="mt-8 flex justify-between gap-4 pt-4 border-t border-slate-800/60">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white bg-white/[0.01] flex items-center gap-2 text-sm disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" /> Back
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-tr from-indigo-500 to-purple-500 font-bold text-white rounded-xl flex items-center gap-2 text-sm cursor-pointer hover:scale-105 transition shadow-lg shadow-indigo-500/20"
          >
            {step === 5 ? 'Launch Platform' : 'Next Step'} <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

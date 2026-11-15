import React, { useState } from 'react';
import { CheckCircle, ArrowRight, BrainCircuit, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type LearningStyle = 'Visual' | 'Logical' | 'Auditory' | 'Reading' | 'Kinesthetic';

interface Question {
  id: number;
  text: string;
  options: { text: string; style: LearningStyle }[];
}

const QUESTIONS: Question[] = [
  { id: 1, text: "When learning a new software, I prefer to:", options: [
      { text: "Watch a video tutorial", style: "Visual" },
      { text: "Figure out the underlying pattern", style: "Logical" },
      { text: "Listen to an expert explain it", style: "Auditory" },
      { text: "Read the official documentation", style: "Reading" },
      { text: "Click around and experiment", style: "Kinesthetic" }
  ]},
  { id: 2, text: "If I am lost in a new city, I would:", options: [
      { text: "Look at a map", style: "Visual" },
      { text: "Use GPS coordinates and grids", style: "Logical" },
      { text: "Ask someone for directions", style: "Auditory" },
      { text: "Read the street signs", style: "Reading" },
      { text: "Just walk until I find a landmark", style: "Kinesthetic" }
  ]},
  { id: 3, text: "When studying for an exam, I usually:", options: [
      { text: "Draw diagrams and charts", style: "Visual" },
      { text: "Organize concepts by relationship", style: "Logical" },
      { text: "Discuss topics with friends", style: "Auditory" },
      { text: "Read and re-write my notes", style: "Reading" },
      { text: "Use flashcards or build models", style: "Kinesthetic" }
  ]},
  { id: 4, text: "I remember things best when I:", options: [
      { text: "See a picture of it", style: "Visual" },
      { text: "Understand why it makes sense", style: "Logical" },
      { text: "Hear someone say it", style: "Auditory" },
      { text: "Write it down repeatedly", style: "Reading" },
      { text: "Perform the action physically", style: "Kinesthetic" }
  ]},
  { id: 5, text: "When solving a difficult math problem:", options: [
      { text: "I visualize the numbers", style: "Visual" },
      { text: "I follow strict formulas step-by-step", style: "Logical" },
      { text: "I talk myself through the steps", style: "Auditory" },
      { text: "I read the textbook example carefully", style: "Reading" },
      { text: "I use physical objects or count on fingers", style: "Kinesthetic" }
  ]},
  { id: 6, text: "My favorite type of class project is:", options: [
      { text: "Creating a poster or presentation slide", style: "Visual" },
      { text: "Developing an algorithm or solving a puzzle", style: "Logical" },
      { text: "Giving a speech or debating", style: "Auditory" },
      { text: "Writing an essay or research paper", style: "Reading" },
      { text: "Building a prototype or doing an experiment", style: "Kinesthetic" }
  ]},
  { id: 7, text: "When assembling furniture, I:", options: [
      { text: "Look at the pictures in the manual", style: "Visual" },
      { text: "Group the pieces logically first", style: "Logical" },
      { text: "Have someone read instructions to me", style: "Auditory" },
      { text: "Read the text steps carefully", style: "Reading" },
      { text: "Start putting pieces together immediately", style: "Kinesthetic" }
  ]},
  { id: 8, text: "If I have to memorize a list, I will:", options: [
      { text: "Visualize the items in my head", style: "Visual" },
      { text: "Categorize them into logical groups", style: "Logical" },
      { text: "Repeat them aloud", style: "Auditory" },
      { text: "Write the list out multiple times", style: "Reading" },
      { text: "Walk around while repeating them", style: "Kinesthetic" }
  ]},
  { id: 9, text: "In my free time, I most enjoy:", options: [
      { text: "Watching movies or playing video games", style: "Visual" },
      { text: "Playing strategy games like chess", style: "Logical" },
      { text: "Listening to music or podcasts", style: "Auditory" },
      { text: "Reading a good book", style: "Reading" },
      { text: "Playing sports or exercising", style: "Kinesthetic" }
  ]},
  { id: 10, text: "When planning a trip, I prefer to:", options: [
      { text: "Look at photos of the destination", style: "Visual" },
      { text: "Create a detailed spreadsheet of costs/times", style: "Logical" },
      { text: "Discuss ideas with travel companions", style: "Auditory" },
      { text: "Read travel blogs and guides", style: "Reading" },
      { text: "Just pack my bags and go", style: "Kinesthetic" }
  ]}
];

export const LearningPersonaAssessment: React.FC = () => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, LearningStyle>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{ style: LearningStyle, score: number }[]>([]);

  const handleSelect = (style: LearningStyle) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: style }));
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const counts: Record<LearningStyle, number> = {
      Visual: 0, Logical: 0, Auditory: 0, Reading: 0, Kinesthetic: 0
    };
    Object.values(answers).forEach(style => {
      counts[style]++;
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const calculated = (Object.keys(counts) as LearningStyle[]).map(style => ({
      style,
      score: Math.round((counts[style] / total) * 100)
    })).sort((a, b) => b.score - a.score);

    setResults(calculated);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="text-brand-purple" />
          Learning Persona Detected
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-slate-300 mb-4">Primary Learning Style</h3>
            <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
              {results[0].style} Learner
            </div>
            <div className="mt-2 text-sm text-slate-400">
              Confidence Score: <span className="text-brand-blue font-bold">{results[0].score}%</span>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-slate-300 mb-4">Persona Distribution</h3>
            <div className="space-y-3">
              {results.map(r => (
                <div key={r.style} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{r.style}</span>
                    <span>{r.score}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className="bg-brand-blue h-1.5 rounded-full" 
                      style={{ width: `${r.score}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8 mt-10">
      <div className="text-center space-y-2">
        <BrainCircuit className="w-10 h-10 text-brand-purple mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">AI Learning Persona Engine</h2>
        <p className="text-slate-400 text-sm">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-300"
          style={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-lg font-semibold text-white">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = answers[currentQuestion] === opt.style;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt.style)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                  isSelected ? 'bg-brand-blue/10 border-brand-blue text-white' : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="text-sm">{opt.text}</span>
                {isSelected && <CheckCircle className="w-5 h-5 text-brand-blue" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={!answers[currentQuestion]}
          className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer hover:opacity-90"
        >
          {currentQuestion === QUESTIONS.length - 1 ? 'Analyze Persona' : 'Next Question'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

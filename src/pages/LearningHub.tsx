import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Sparkles, Filter, BookOpen, Clock, Star, PlayCircle,
  ExternalLink, Award, ChevronRight, ChevronDown, Briefcase,
  GraduationCap, Zap, Target, Code, Globe, TrendingUp, X,
  CheckCircle2, Users, DollarSign, Video, Layers, ArrowRight, Brain
} from 'lucide-react';
import { Course, Roadmap, AIRecommendation } from '../types/course';

// ─── Mock Fallback Data ──────────────────────────────────────────────────────
const PROVIDERS = ['Coursera', 'Udemy', 'YouTube', 'edX', 'Google', 'IBM', 'AWS', 'NPTEL', 'SWAYAM', 'Microsoft', 'Harvard', 'MIT'];
const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};
const PROVIDER_COLORS: Record<string, string> = {
  Coursera: 'bg-blue-600', Udemy: 'bg-purple-600', YouTube: 'bg-red-600',
  edX: 'bg-red-700', Google: 'bg-green-600', IBM: 'bg-blue-900',
  AWS: 'bg-orange-600', NPTEL: 'bg-yellow-700', SWAYAM: 'bg-teal-600',
  Microsoft: 'bg-blue-500', Harvard: 'bg-rose-900', MIT: 'bg-slate-600',
};

const FALLBACK_COURSES: Course[] = [
  { _id: '1', title: 'Machine Learning A-Z: AI, Python & R', provider: 'Udemy', thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80', duration: '44 hours', difficulty: 'Beginner', price: 499, is_free: false, rating: 4.8, skills_covered: ['Python', 'Machine Learning', 'scikit-learn', 'R'], target_audience: ['Undergraduate', 'Job Seeker'], url: 'https://www.udemy.com/course/machinelearning/', certificate_offered: true, language: 'English' },
  { _id: '2', title: 'CS50: Introduction to Computer Science', provider: 'Harvard', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80', duration: '12 weeks', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.9, skills_covered: ['C', 'Python', 'SQL', 'JavaScript', 'Algorithms'], target_audience: ['Class 11', 'Class 12', 'Undergraduate'], url: 'https://cs50.harvard.edu/', certificate_offered: true, language: 'English' },
  { _id: '3', title: 'AWS Certified Cloud Practitioner', provider: 'AWS', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80', duration: '15 hours', difficulty: 'Intermediate', price: 0, is_free: true, rating: 4.7, skills_covered: ['Cloud', 'AWS', 'EC2', 'S3', 'DevOps'], target_audience: ['Undergraduate', 'Postgraduate', 'Job Seeker'], url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', certificate_offered: true, language: 'English' },
  { _id: '4', title: 'Python for Everybody Specialization', provider: 'Coursera', thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?w=500&q=80', duration: '8 months', difficulty: 'Beginner', price: 1499, is_free: false, rating: 4.8, skills_covered: ['Python', 'Data Structures', 'Databases', 'Web Scraping'], target_audience: ['Class 12', 'Diploma', 'Undergraduate'], url: 'https://www.coursera.org/specializations/python', certificate_offered: true, language: 'English' },
  { _id: '5', title: 'React - The Complete Guide 2024', provider: 'Udemy', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80', duration: '68 hours', difficulty: 'Intermediate', price: 499, is_free: false, rating: 4.7, skills_covered: ['React', 'Redux', 'Hooks', 'TypeScript', 'Next.js'], target_audience: ['Undergraduate', 'Job Seeker'], url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', certificate_offered: true, language: 'English' },
  { _id: '6', title: 'Deep Learning Specialization', provider: 'Coursera', thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=80', duration: '3 months', difficulty: 'Advanced', price: 2499, is_free: false, rating: 4.9, skills_covered: ['TensorFlow', 'Neural Networks', 'CNN', 'RNN', 'Transformers'], target_audience: ['Postgraduate', 'Job Seeker', 'Undergraduate'], url: 'https://www.coursera.org/specializations/deep-learning', certificate_offered: true, language: 'English' },
  { _id: '7', title: 'Google Data Analytics Certificate', provider: 'Google', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80', duration: '6 months', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.6, skills_covered: ['Data Analysis', 'SQL', 'Tableau', 'R', 'Spreadsheets'], target_audience: ['Undergraduate', 'Job Seeker', 'Class 12'], url: 'https://grow.google/certificates/data-analytics/', certificate_offered: true, language: 'English' },
  { _id: '8', title: 'IBM Full Stack Software Developer', provider: 'IBM', thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&q=80', duration: '4 months', difficulty: 'Intermediate', price: 0, is_free: true, rating: 4.5, skills_covered: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Docker'], target_audience: ['Undergraduate', 'Diploma', 'Job Seeker'], url: 'https://www.ibm.com/training', certificate_offered: true, language: 'English' },
  { _id: '9', title: 'NPTEL: Programming in Python', provider: 'NPTEL', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80', duration: '8 weeks', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.4, skills_covered: ['Python', 'OOP', 'Algorithms', 'File I/O'], target_audience: ['Class 12', 'Diploma', 'Undergraduate', 'ITI'], url: 'https://nptel.ac.in/', certificate_offered: true, language: 'Hindi & English' },
  { _id: '10', title: 'Microsoft Azure Fundamentals AZ-900', provider: 'Microsoft', thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80', duration: '10 hours', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.6, skills_covered: ['Azure', 'Cloud Computing', 'Networking', 'Security'], target_audience: ['Undergraduate', 'Postgraduate', 'Job Seeker'], url: 'https://learn.microsoft.com/azure', certificate_offered: true, language: 'English' },
  { _id: '11', title: 'Industrial Automation & PLC Programming', provider: 'SWAYAM', thumbnail: 'https://images.unsplash.com/photo-1504917595217-d4ce5eb922fc?w=500&q=80', duration: '12 weeks', difficulty: 'Intermediate', price: 0, is_free: true, rating: 4.3, skills_covered: ['PLC', 'SCADA', 'Automation', 'Electrical Circuits'], target_audience: ['Diploma', 'ITI', 'Undergraduate'], url: 'https://swayam.gov.in/', certificate_offered: true, language: 'Hindi & English' },
  { _id: '12', title: 'Full Stack Web Dev with Node.js & React', provider: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=500&q=80', duration: '12 hours', difficulty: 'Intermediate', price: 0, is_free: true, rating: 4.7, skills_covered: ['Node.js', 'React', 'MongoDB', 'Express', 'REST API'], target_audience: ['Undergraduate', 'Job Seeker', 'Diploma'], url: 'https://www.youtube.com/', certificate_offered: false, language: 'Hindi' },
  { _id: '13', title: 'Data Structures & Algorithms in Java', provider: 'Udemy', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&q=80', duration: '56 hours', difficulty: 'Advanced', price: 499, is_free: false, rating: 4.8, skills_covered: ['Java', 'DSA', 'Graphs', 'Trees', 'Dynamic Programming'], target_audience: ['Undergraduate', 'Postgraduate', 'Job Seeker'], url: 'https://www.udemy.com/', certificate_offered: true, language: 'English' },
  { _id: '14', title: 'Cybersecurity Fundamentals', provider: 'IBM', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80', duration: '3 months', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.5, skills_covered: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Firewalls'], target_audience: ['Undergraduate', 'Job Seeker'], url: 'https://www.ibm.com/training', certificate_offered: true, language: 'English' },
  { _id: '15', title: 'JEE Advanced Mathematics Crash Course', provider: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80', duration: '80 hours', difficulty: 'Advanced', price: 0, is_free: true, rating: 4.6, skills_covered: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry'], target_audience: ['Class 11', 'Class 12'], url: 'https://www.youtube.com/', certificate_offered: false, language: 'Hindi' },
  { _id: '16', title: 'DevOps & CI/CD with Docker & Kubernetes', provider: 'edX', thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&q=80', duration: '5 months', difficulty: 'Advanced', price: 2999, is_free: false, rating: 4.7, skills_covered: ['Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Terraform'], target_audience: ['Postgraduate', 'Job Seeker'], url: 'https://www.edx.org/', certificate_offered: true, language: 'English' },
  { _id: '17', title: 'Resume Building & ATS Optimization', provider: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&q=80', duration: '3 hours', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.5, skills_covered: ['Resume Writing', 'ATS', 'LinkedIn', 'Cover Letter'], target_audience: ['Job Seeker', 'Postgraduate', 'Undergraduate'], url: 'https://www.youtube.com/', certificate_offered: false, language: 'Hindi & English' },
  { _id: '18', title: 'NEET Biology Complete Syllabus', provider: 'YouTube', thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80', duration: '120 hours', difficulty: 'Intermediate', price: 0, is_free: true, rating: 4.7, skills_covered: ['Zoology', 'Botany', 'Human Physiology', 'Genetics'], target_audience: ['Class 11', 'Class 12'], url: 'https://www.youtube.com/', certificate_offered: false, language: 'Hindi' },
  { _id: '19', title: 'CAD & AutoCAD for Civil Engineers', provider: 'SWAYAM', thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80', duration: '6 weeks', difficulty: 'Beginner', price: 0, is_free: true, rating: 4.3, skills_covered: ['AutoCAD', 'Civil Drafting', 'Structural Drawing', '3D Modeling'], target_audience: ['Diploma', 'Undergraduate', 'ITI'], url: 'https://swayam.gov.in/', certificate_offered: true, language: 'Hindi & English' },
  { _id: '20', title: 'Business Analytics with Excel & Power BI', provider: 'Coursera', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80', duration: '4 months', difficulty: 'Intermediate', price: 1999, is_free: false, rating: 4.6, skills_covered: ['Excel', 'Power BI', 'Statistics', 'Data Visualization', 'Dashboard'], target_audience: ['Undergraduate', 'Postgraduate', 'Job Seeker'], url: 'https://www.coursera.org/', certificate_offered: true, language: 'English' },
];

const FALLBACK_ROADMAPS: Record<string, Roadmap> = {
  'AI Engineer': {
    _id: 'r1', career: 'AI Engineer',
    description: 'Master Artificial Intelligence from foundations to production deployment.',
    steps: [
      { step_number: 1, title: 'Python Programming', description: 'Learn Python syntax, OOP, and standard libraries.', recommended_skills: ['Python', 'OOP', 'NumPy'], courses: [] },
      { step_number: 2, title: 'Mathematics for ML', description: 'Linear Algebra, Calculus, Statistics — the backbone of AI.', recommended_skills: ['Linear Algebra', 'Calculus', 'Probability'], courses: [] },
      { step_number: 3, title: 'Data Manipulation', description: 'Clean, transform and analyze data with Pandas & SQL.', recommended_skills: ['Pandas', 'SQL', 'Matplotlib'], courses: [] },
      { step_number: 4, title: 'Machine Learning', description: 'Supervised, unsupervised algorithms with scikit-learn.', recommended_skills: ['scikit-learn', 'Regression', 'Classification', 'Clustering'], courses: [] },
      { step_number: 5, title: 'Deep Learning', description: 'Neural networks, CNNs, RNNs, Transformers with TensorFlow/PyTorch.', recommended_skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'], courses: [] },
      { step_number: 6, title: 'Projects & Portfolio', description: 'Build end-to-end ML projects and publish on GitHub.', recommended_skills: ['Git', 'GitHub', 'Kaggle', 'Hugging Face'], courses: [] },
      { step_number: 7, title: 'Deployment', description: 'Deploy models to production using FastAPI, Docker, AWS.', recommended_skills: ['Docker', 'AWS', 'FastAPI', 'MLflow'], courses: [] },
      { step_number: 8, title: 'Internship → Job', description: 'Apply for AI roles, crack interviews and get placed.', recommended_skills: ['DSA', 'System Design', 'Communication'], courses: [] },
    ]
  },
  'Full Stack Developer': {
    _id: 'r2', career: 'Full Stack Developer',
    description: 'Become a complete web developer — from pixel-perfect UIs to scalable backends.',
    steps: [
      { step_number: 1, title: 'HTML & CSS Fundamentals', description: 'Structure and style web pages from scratch.', recommended_skills: ['HTML5', 'CSS3', 'Flexbox', 'Grid'], courses: [] },
      { step_number: 2, title: 'JavaScript & ES6+', description: 'Master the language of the web.', recommended_skills: ['JavaScript', 'DOM', 'Async/Await', 'Fetch API'], courses: [] },
      { step_number: 3, title: 'Frontend Framework — React', description: 'Build modern SPAs with React and state management.', recommended_skills: ['React', 'Redux', 'Hooks', 'TypeScript'], courses: [] },
      { step_number: 4, title: 'Backend — Node.js & Express', description: 'Build RESTful APIs and server-side logic.', recommended_skills: ['Node.js', 'Express', 'REST API', 'JWT'], courses: [] },
      { step_number: 5, title: 'Databases', description: 'Work with SQL and NoSQL databases.', recommended_skills: ['MongoDB', 'PostgreSQL', 'Mongoose'], courses: [] },
      { step_number: 6, title: 'DevOps & Deployment', description: 'Deploy apps using Docker, GitHub Actions, Vercel.', recommended_skills: ['Docker', 'CI/CD', 'Vercel', 'Nginx'], courses: [] },
    ]
  }
};

const LEARNING_PATHS: Record<string, string[]> = {
  'Class 11': ['JEE Preparation', 'NEET Basics', 'Olympiads', 'Coding Intro', 'Career Awareness', 'Scholarships'],
  'Class 12': ['JEE Advanced', 'NEET', 'CUET', 'NDA', 'CLAT', 'CA Foundation', 'AI Basics'],
  'Diploma': ['CAD & AutoCAD', 'PLC Programming', 'Software Skills', 'Internship Prep', 'Resume Building'],
  'ITI': ['Government Jobs Prep', 'Apprenticeship', 'Industrial Safety', 'Electrical Training'],
  'Undergraduate': ['DSA', 'Web Development', 'Cloud Computing', 'Machine Learning', 'Interview Prep', 'GitHub Portfolio'],
  'Postgraduate': ['Research Methods', 'Advanced ML', 'Management', 'Leadership', 'Industry Certifications'],
  'Job Seeker': ['Resume Building', 'Interview Preparation', 'Mock Interviews', 'ATS Resume', 'LinkedIn Optimization', 'GitHub Portfolio'],
};

const CAREER_GOALS = ['AI Engineer', 'Full Stack Developer', 'Data Scientist', 'Cloud Architect', 'Cybersecurity Analyst', 'DevOps Engineer', 'UI/UX Designer', 'Product Manager', 'Business Analyst'];

// ─── AI Recommendation fallback ──────────────────────────────────────────────
const getFallbackRecommendations = (careerGoal: string, educationLevel: string): AIRecommendation[] => [
  {
    course_title: `${careerGoal} — Complete Roadmap`,
    why_recommended: `Based on your ${educationLevel} profile, this pathway is specifically tailored to help you enter the ${careerGoal} field with structured, step-by-step guidance covering both theoretical foundations and hands-on projects.`,
    skills_to_learn: ['Python', 'Data Structures', 'System Design', 'Problem Solving'],
    expected_salary: '6–14 LPA'
  },
  {
    course_title: 'Git, GitHub & Open Source Contribution',
    why_recommended: `Every ${educationLevel} student targeting ${careerGoal} needs a strong GitHub portfolio. Recruiters check it before your resume.`,
    skills_to_learn: ['Git', 'GitHub', 'Open Source', 'Version Control'],
    expected_salary: '5–10 LPA'
  },
  {
    course_title: 'Communication & Professional Skills',
    why_recommended: 'Technical knowledge alone is not enough. Strong communication skills dramatically increase your chances of clearing HR rounds and performing well in team environments.',
    skills_to_learn: ['Communication', 'Presentation', 'Teamwork', 'Email Etiquette'],
    expected_salary: '10–20% salary increase'
  }
];

// ─── SubComponents ────────────────────────────────────────────────────────────
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107c.502-1.89.502-5.837.502-5.837s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const ProviderBadge: React.FC<{ provider: string }> = ({ provider }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-wider ${PROVIDER_COLORS[provider] || 'bg-slate-600'}`}>
    {provider}
  </span>
);

const CourseCardItem: React.FC<{ course: Course; idx: number }> = ({ course, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(idx * 0.04, 0.5) }}
    className="bg-[#0d1117] border border-slate-800/70 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-600/60 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
  >
    {/* Thumbnail */}
    <div className="relative h-44 overflow-hidden bg-slate-900">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${course._id}/500/300`; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Top badges */}
      <div className="absolute top-3 left-3"><ProviderBadge provider={course.provider} /></div>
      <div className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${course.is_free ? 'bg-emerald-500 text-black' : 'bg-slate-900 text-white border border-slate-600'}`}>
        {course.is_free ? 'FREE' : `₹${course.price}`}
      </div>

      {/* Bottom left — difficulty */}
      <div className={`absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold border ${DIFFICULTY_COLORS[course.difficulty] || 'text-slate-400 bg-slate-800 border-slate-700'}`}>
        {course.difficulty}
      </div>

      {/* Bottom right — rating */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur px-2 py-0.5 rounded text-[11px] font-bold text-amber-400">
        <Star className="w-3 h-3 fill-amber-400" /> {course.rating.toFixed(1)}
      </div>
    </div>

    {/* Body */}
    <div className="p-5 flex flex-col flex-1 gap-3">
      <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors" title={course.title}>
        {course.title}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {course.skills_covered.slice(0, 3).map((skill, i) => (
          <span key={i} className="text-[9px] font-semibold bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{skill}</span>
        ))}
        {course.skills_covered.length > 3 && (
          <span className="text-[9px] font-semibold bg-slate-800 border border-slate-700 text-slate-500 px-2 py-0.5 rounded-full">+{course.skills_covered.length - 3}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mt-auto pt-3 border-t border-slate-800">
        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-400" />{course.duration}</div>
        {course.certificate_offered && (
          <div className="flex items-center gap-1.5 text-purple-400"><Award className="w-3.5 h-3.5" />Certificate</div>
        )}
        <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-teal-400" />{course.language.split('&')[0].trim()}</div>
      </div>

      <a
        href={course.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 mt-1 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] cursor-pointer
          bg-[#161b22] hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white"
      >
        {course.provider === 'YouTube' ? <><YoutubeIcon className="w-4 h-4 text-red-500" /> Watch Free</> : <><ExternalLink className="w-4 h-4" /> Enroll Now</>}
      </a>
    </div>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export const LearningHub: React.FC = () => {
  const { user } = useAuth();

  const educationLevel = user?.academicProfile?.classLevel || 'Undergraduate';
  const stream = user?.academicProfile?.stream || 'Engineering';
  const careerGoal = user?.academicProfile?.careerGoal || 'AI Engineer';
  const userName = user?.name?.split(' ')[0] || 'Learner';

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);
  const [aiRecs, setAiRecs] = useState<AIRecommendation[]>([]);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'roadmap' | 'path'>('courses');
  const [selectedCareer, setSelectedCareer] = useState(careerGoal);

  // Filters
  const [search, setSearch] = useState('');
  const [filterProvider, setFilterProvider] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterPricing, setFilterPricing] = useState('All');
  const [filterAudience, setFilterAudience] = useState('All');

  // Pagination
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);

  // Init
  useEffect(() => {
    loadCourses();
    loadAIRecommendations();
  }, []);

  useEffect(() => {
    setRoadmap(FALLBACK_ROADMAPS[selectedCareer] || FALLBACK_ROADMAPS['AI Engineer']);
  }, [selectedCareer]);

  useEffect(() => {
    applyFilters();
  }, [courses, search, filterProvider, filterDifficulty, filterPricing, filterAudience, page]);

  const loadCourses = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/courses/');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCourses(data.length > 0 ? data : FALLBACK_COURSES);
    } catch {
      setCourses(FALLBACK_COURSES);
    }
  };

  const loadAIRecommendations = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/courses/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education_level: educationLevel, stream, career_goal: careerGoal, skills: [] }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAiRecs(data.recommendations?.length ? data.recommendations : getFallbackRecommendations(careerGoal, educationLevel));
    } catch {
      setAiRecs(getFallbackRecommendations(careerGoal, educationLevel));
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = [...courses];
    if (search) filtered = filtered.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills_covered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      c.provider.toLowerCase().includes(search.toLowerCase())
    );
    if (filterProvider !== 'All') filtered = filtered.filter(c => c.provider === filterProvider);
    if (filterDifficulty !== 'All') filtered = filtered.filter(c => c.difficulty === filterDifficulty);
    if (filterPricing === 'Free') filtered = filtered.filter(c => c.is_free);
    if (filterPricing === 'Paid') filtered = filtered.filter(c => !c.is_free);
    if (filterAudience !== 'All') filtered = filtered.filter(c => c.target_audience.some(a => a.toLowerCase().includes(filterAudience.toLowerCase())));
    setDisplayedCourses(filtered.slice(0, page * PAGE_SIZE));
  }, [courses, search, filterProvider, filterDifficulty, filterPricing, filterAudience, page]);

  const resetFilters = () => {
    setSearch(''); setFilterProvider('All'); setFilterDifficulty('All');
    setFilterPricing('All'); setFilterAudience('All'); setPage(1);
  };

  const hasFilters = search || filterProvider !== 'All' || filterDifficulty !== 'All' || filterPricing !== 'All' || filterAudience !== 'All';
  const learningPath = LEARNING_PATHS[educationLevel] || LEARNING_PATHS['Undergraduate'];

  const tabs = [
    { id: 'courses', label: 'Course Explorer', icon: BookOpen },
    { id: 'roadmap', label: 'Career Roadmap', icon: Target },
    { id: 'path', label: 'My Learning Path', icon: Layers },
  ] as const;

  return (
    <div className="space-y-8 pb-16 font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative rounded-[2rem] overflow-hidden bg-[#0d1117] border border-slate-800/60 shadow-2xl">
        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-32 bg-indigo-500/5 blur-[80px]" />
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left: Text */}
            <div className="space-y-5 max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-black text-blue-400 tracking-widest uppercase">
                <Brain className="w-4 h-4 text-amber-400 animate-pulse" />
                AI-Powered Learning Engine
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{userName}!</span>
                <br />Your personalized path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">mastery.</span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed">
                Curated <strong className="text-white">free & premium</strong> courses from Coursera, Udemy, NPTEL, YouTube & more —
                tailored for your goal: <strong className="text-purple-400">{careerGoal}</strong>.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { icon: GraduationCap, label: educationLevel, color: 'text-emerald-400' },
                  { icon: Briefcase, label: careerGoal, color: 'text-amber-400' },
                  { icon: Code, label: stream, color: 'text-blue-400' },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2 bg-[#161b22] border border-slate-700 px-3 py-1.5 rounded-xl text-sm font-semibold text-slate-300">
                    <Icon className={`w-4 h-4 ${color}`} /> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { label: 'Free Courses', value: `${courses.filter(c => c.is_free).length}+`, color: 'from-emerald-600 to-teal-600' },
                { label: 'Premium Courses', value: `${courses.filter(c => !c.is_free).length}+`, color: 'from-blue-600 to-indigo-600' },
                { label: 'Career Roadmaps', value: `${Object.keys(FALLBACK_ROADMAPS).length}+`, color: 'from-purple-600 to-violet-600' },
                { label: 'Top Providers', value: `${PROVIDERS.length}+`, color: 'from-amber-600 to-orange-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-[#161b22] border border-slate-800 rounded-2xl p-4 text-center">
                  <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${color}`}>{value}</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AI RECOMMENDATIONS ──────────────────────────────────────────────── */}
      <div className="relative bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-600" />
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Gemini AI Recommends For You</h2>
              <p className="text-slate-500 text-sm">Based on your profile & career goal: <span className="text-amber-400 font-semibold">{careerGoal}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiRecs.map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
                className="bg-[#161b22] border border-slate-800 rounded-xl p-5 hover:border-amber-500/30 transition-all group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-black text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
                    {rec.course_title}
                  </h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{rec.why_recommended}</p>
                <div className="space-y-2 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {rec.skills_to_learn.map((s, i) => (
                      <span key={i} className="text-[9px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" /> {rec.expected_salary}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS ────────────────────────────────────────────────────────────── */}
      <div className="flex gap-1 bg-[#161b22] border border-slate-800 rounded-2xl p-1.5">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === id
                ? 'bg-[#0d1117] text-white border border-slate-700 shadow-lg'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon className={`w-4 h-4 ${activeTab === id ? 'text-blue-400' : ''}`} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'courses' && (
          <motion.div key="courses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Filters Row */}
            <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search by title, skill, or platform..."
                  className="w-full bg-[#161b22] border border-slate-700 focus:border-blue-500 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-500"
                />
              </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                  <Filter className="w-3.5 h-3.5" /> Filters:
                </div>

                {[
                  { label: 'Provider', value: filterProvider, onChange: setFilterProvider, options: ['All', ...PROVIDERS] },
                  { label: 'Level', value: filterDifficulty, onChange: setFilterDifficulty, options: ['All', 'Beginner', 'Intermediate', 'Advanced'] },
                  { label: 'Price', value: filterPricing, onChange: setFilterPricing, options: ['All', 'Free', 'Paid'] },
                  { label: 'Audience', value: filterAudience, onChange: setFilterAudience, options: ['All', 'Class 11', 'Class 12', 'Diploma', 'ITI', 'Undergraduate', 'Postgraduate', 'Job Seeker'] },
                ].map(({ label, value, onChange, options }) => (
                  <select
                    key={label}
                    value={value}
                    onChange={e => { onChange(e.target.value); setPage(1); }}
                    className="bg-[#161b22] border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {options.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label}s` : o}</option>)}
                  </select>
                ))}

                {hasFilters && (
                  <button onClick={resetFilters} className="flex items-center gap-1.5 text-xs text-rose-400 font-bold hover:text-rose-300 transition-colors">
                    <X className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}

                <div className="ml-auto text-xs text-slate-500 font-medium">
                  {displayedCourses.length} of {courses.filter(c => {
                    const pMatch = filterProvider === 'All' || c.provider === filterProvider;
                    const dMatch = filterDifficulty === 'All' || c.difficulty === filterDifficulty;
                    const prMatch = filterPricing === 'All' || (filterPricing === 'Free' ? c.is_free : !c.is_free);
                    return pMatch && dMatch && prMatch;
                  }).length} courses
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedCourses.map((course, idx) => (
                <CourseCardItem key={course._id} course={course} idx={idx} />
              ))}
            </div>

            {displayedCourses.length === 0 && (
              <div className="py-24 text-center bg-[#0d1117] border border-dashed border-slate-800 rounded-2xl">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-400 font-semibold text-lg">No courses match your filters.</p>
                <button onClick={resetFilters} className="mt-4 px-5 py-2 bg-blue-500/10 text-blue-400 font-bold rounded-xl text-sm hover:bg-blue-500/20 transition-colors">
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {courses.length > displayedCourses.length && (
              <div className="text-center pt-4">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-8 py-3 bg-[#161b22] border border-slate-700 hover:border-blue-500 text-white font-bold rounded-xl text-sm transition-all hover:text-blue-400 flex items-center gap-2 mx-auto"
                >
                  <ChevronDown className="w-4 h-4" /> Load More Courses
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'roadmap' && (
          <motion.div key="roadmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Career selector */}
            <div className="flex flex-wrap gap-2">
              {CAREER_GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => setSelectedCareer(goal)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCareer === goal
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#161b22] border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>

            {/* Roadmap Visualization */}
            {roadmap ? (
              <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{roadmap.career}</span> — Career Roadmap
                  </h2>
                  <p className="text-slate-400 mt-2 text-sm max-w-2xl">{roadmap.description}</p>
                </div>

                <div className="space-y-4 relative">
                  {/* Vertical line */}
                  <div className="absolute left-[23px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-slate-800 opacity-40" />

                  {roadmap.steps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex gap-5 relative"
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm relative z-10 shadow-lg
                        ${idx === 0 ? 'bg-blue-600 text-white shadow-blue-500/30' : 'bg-[#161b22] border-2 border-slate-700 text-slate-400'}`}
                      >
                        {step.step_number}
                      </div>

                      <div className="flex-1 bg-[#161b22] border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-bold text-white flex items-center gap-2">
                            {step.title}
                            {idx === 0 && <span className="text-[9px] font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded uppercase">Start Here</span>}
                          </h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.recommended_skills.map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Final goal badge */}
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 relative z-10 shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-5">
                      <h3 className="text-base font-black text-emerald-400">🎯 Goal Unlocked: {roadmap.career}</h3>
                      <p className="text-slate-400 text-sm mt-1">You've mastered the complete roadmap. Apply for jobs, build your portfolio, and start your career journey!</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-slate-700" />
                <p>Select a career goal above to view its roadmap.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'path' && (
          <motion.div key="path" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">My Learning Path</h2>
                  <p className="text-slate-500 text-sm">Personalized for: <span className="text-purple-400 font-semibold">{educationLevel}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningPath.map((topic, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.07 }}
                    className="flex items-center gap-4 bg-[#161b22] border border-slate-800 rounded-xl p-4 hover:border-purple-500/30 group transition-all cursor-pointer"
                    onClick={() => { setSearch(topic); setActiveTab('courses'); }}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm shrink-0
                      ${idx < 3 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-[#0d1117] text-slate-500 border border-slate-800'}`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate group-hover:text-purple-400 transition-colors">{topic}</p>
                      <p className="text-xs text-slate-500">Click to explore courses</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                ))}
              </div>

              {/* Education level selector */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">Explore paths for other levels:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(LEARNING_PATHS).map(level => (
                    <button
                      key={level}
                      onClick={() => { setSearch(''); setActiveTab('courses'); setFilterAudience(level); }}
                      className="px-3 py-1.5 bg-[#161b22] border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-purple-400 text-xs font-bold rounded-lg transition-all"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

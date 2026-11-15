// ML Recommendation Engine - Mocked Random Forest simulation
// This simulates what a Python Scikit-learn Random Forest would output

export interface StudentFeatures {
  math: number;           // 0-100
  programming: number;    // 0-100
  communication: number;  // 0-100
  leadership: number;     // 0-100
  problemSolving: number; // 0-100
  creativity: number;     // 0-100
  projects: number;       // 0-10
  certificates: number;   // 0-10
  attendance: number;     // 0-100
  cgpa: number;           // 0-10
  learningStyle: string;
  interests: string[];
  skills: string[];
}

export interface CareerPrediction {
  career: string;
  confidence: number;
  reason: string;
  requiredSkills: string[];
  salary: string;
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  resources: string[];
  projects: string[];
}

export interface PlacementReadiness {
  overall: number;
  technical: number;
  communication: number;
  resume: number;
  interview: number;
  placement: number;
}

// Career database with required skills and weights
const CAREER_DATABASE: Record<string, {
  weights: { math: number; programming: number; communication: number; leadership: number; problemSolving: number; creativity: number; projects: number; certificates: number; attendance: number; cgpa: number };
  requiredSkills: string[];
  salary: string;
  reasons: string[];
}> = {
  'AI & ML Engineer': {
    weights: { math: 0.15, programming: 0.20, communication: 0.05, leadership: 0.03, problemSolving: 0.15, creativity: 0.10, projects: 0.12, certificates: 0.05, attendance: 0.05, cgpa: 0.10 },
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Linear Algebra', 'Probability', 'Data Analysis', 'Deep Learning', 'NLP'],
    salary: '₹8-25 LPA',
    reasons: ['Strong mathematical foundation', 'High programming aptitude', 'Pattern recognition ability']
  },
  'Full Stack Developer': {
    weights: { math: 0.05, programming: 0.25, communication: 0.08, leadership: 0.05, problemSolving: 0.15, creativity: 0.12, projects: 0.15, certificates: 0.05, attendance: 0.03, cgpa: 0.07 },
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'REST APIs', 'Git', 'Docker', 'TypeScript'],
    salary: '₹6-20 LPA',
    reasons: ['Excellent coding skills', 'Creative UI sense', 'Strong project portfolio']
  },
  'Data Scientist': {
    weights: { math: 0.18, programming: 0.15, communication: 0.08, leadership: 0.05, problemSolving: 0.15, creativity: 0.07, projects: 0.10, certificates: 0.07, attendance: 0.05, cgpa: 0.10 },
    requiredSkills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning', 'Tableau', 'Pandas', 'Feature Engineering'],
    salary: '₹8-22 LPA',
    reasons: ['Analytical mindset', 'Strong statistical knowledge', 'Data-driven decision making']
  },
  'Cyber Security Analyst': {
    weights: { math: 0.10, programming: 0.15, communication: 0.10, leadership: 0.05, problemSolving: 0.20, creativity: 0.05, projects: 0.10, certificates: 0.15, attendance: 0.05, cgpa: 0.05 },
    requiredSkills: ['Network Security', 'Ethical Hacking', 'SIEM', 'Cryptography', 'Linux', 'Python', 'Penetration Testing', 'OWASP'],
    salary: '₹7-18 LPA',
    reasons: ['High problem-solving ability', 'Security-oriented thinking', 'Strong certifications']
  },
  'Cloud Architect': {
    weights: { math: 0.08, programming: 0.15, communication: 0.10, leadership: 0.10, problemSolving: 0.15, creativity: 0.05, projects: 0.12, certificates: 0.15, attendance: 0.05, cgpa: 0.05 },
    requiredSkills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Microservices'],
    salary: '₹10-30 LPA',
    reasons: ['Infrastructure expertise', 'System design capability', 'Cloud certification readiness']
  },
  'Product Manager': {
    weights: { math: 0.05, programming: 0.08, communication: 0.20, leadership: 0.20, problemSolving: 0.15, creativity: 0.12, projects: 0.08, certificates: 0.02, attendance: 0.05, cgpa: 0.05 },
    requiredSkills: ['Product Strategy', 'Agile', 'User Research', 'Wireframing', 'SQL', 'Analytics', 'A/B Testing', 'Roadmapping'],
    salary: '₹12-35 LPA',
    reasons: ['Leadership qualities', 'Excellent communication', 'Strategic thinking']
  },
  'DevOps Engineer': {
    weights: { math: 0.05, programming: 0.18, communication: 0.08, leadership: 0.05, problemSolving: 0.18, creativity: 0.05, projects: 0.15, certificates: 0.12, attendance: 0.07, cgpa: 0.07 },
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'Ansible', 'Terraform', 'Bash', 'Monitoring'],
    salary: '₹8-25 LPA',
    reasons: ['Automation mindset', 'Infrastructure knowledge', 'CI/CD expertise']
  },
  'Mobile App Developer': {
    weights: { math: 0.05, programming: 0.22, communication: 0.05, leadership: 0.03, problemSolving: 0.12, creativity: 0.18, projects: 0.18, certificates: 0.05, attendance: 0.05, cgpa: 0.07 },
    requiredSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'REST APIs', 'Firebase', 'UI/UX', 'App Store'],
    salary: '₹6-18 LPA',
    reasons: ['Mobile-first creativity', 'Strong UI/UX skills', 'Published app portfolio']
  },
  'Blockchain Developer': {
    weights: { math: 0.12, programming: 0.20, communication: 0.05, leadership: 0.03, problemSolving: 0.18, creativity: 0.10, projects: 0.15, certificates: 0.07, attendance: 0.05, cgpa: 0.05 },
    requiredSkills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'Cryptography', 'DeFi', 'Rust', 'NFTs'],
    salary: '₹10-30 LPA',
    reasons: ['Decentralized systems thinking', 'Cryptographic foundations', 'Innovative mindset']
  },
  'UX/UI Designer': {
    weights: { math: 0.02, programming: 0.08, communication: 0.15, leadership: 0.05, problemSolving: 0.10, creativity: 0.30, projects: 0.15, certificates: 0.05, attendance: 0.05, cgpa: 0.05 },
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'HTML/CSS', 'Accessibility'],
    salary: '₹5-15 LPA',
    reasons: ['Exceptional creativity', 'Visual design sense', 'User empathy']
  },
};

// Simulate Random Forest scoring
export function predictCareers(features: StudentFeatures): CareerPrediction[] {
  const predictions: CareerPrediction[] = [];

  for (const [career, config] of Object.entries(CAREER_DATABASE)) {
    const w = config.weights;
    let score =
      (features.math / 100) * w.math +
      (features.programming / 100) * w.programming +
      (features.communication / 100) * w.communication +
      (features.leadership / 100) * w.leadership +
      (features.problemSolving / 100) * w.problemSolving +
      (features.creativity / 100) * w.creativity +
      (features.projects / 10) * w.projects +
      (features.certificates / 10) * w.certificates +
      (features.attendance / 100) * w.attendance +
      (features.cgpa / 10) * w.cgpa;

    // Boost for matching interests
    const interestBoost = features.interests.some(i =>
      career.toLowerCase().includes(i.toLowerCase()) ||
      i.toLowerCase().includes(career.split(' ')[0].toLowerCase())
    ) ? 0.08 : 0;

    score = Math.min(score + interestBoost, 1.0);
    const confidence = Math.round(score * 100);

    predictions.push({
      career,
      confidence,
      reason: config.reasons[Math.floor(Math.random() * config.reasons.length)],
      requiredSkills: config.requiredSkills,
      salary: config.salary,
    });
  }

  return predictions.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}

// Skill Gap Analysis
export function analyzeSkillGap(currentSkills: string[], targetCareer: string): SkillGap[] {
  const config = CAREER_DATABASE[targetCareer];
  if (!config) return [];

  const currentLower = currentSkills.map(s => s.toLowerCase());
  const gaps: SkillGap[] = [];

  for (const skill of config.requiredSkills) {
    const hasSkill = currentLower.includes(skill.toLowerCase());
    gaps.push({
      skill,
      current: hasSkill ? Math.floor(Math.random() * 30) + 50 : Math.floor(Math.random() * 25) + 5,
      required: Math.floor(Math.random() * 15) + 75,
      resources: [
        `${skill} Masterclass - Udemy`,
        `${skill} Documentation`,
        `${skill} YouTube Playlist`,
      ],
      projects: [
        `Build a ${skill} based portfolio project`,
        `Contribute to open source ${skill} project`,
      ],
    });
  }

  return gaps.sort((a, b) => (a.current - a.required) - (b.current - b.required));
}

// Placement Readiness
export function calculatePlacementReadiness(features: StudentFeatures): PlacementReadiness {
  const technical = Math.round((features.programming * 0.4 + features.math * 0.2 + features.problemSolving * 0.4));
  const communication = Math.round(features.communication * 0.6 + features.leadership * 0.4);
  const resume = Math.round((features.projects / 10) * 40 + (features.certificates / 10) * 30 + features.cgpa * 3);
  const interview = Math.round(technical * 0.4 + communication * 0.3 + features.problemSolving * 0.3);
  const placement = Math.round((technical + communication + resume + interview) / 4);
  const overall = Math.round(placement * 0.7 + features.attendance * 0.3);

  return {
    overall: Math.min(overall, 100),
    technical: Math.min(technical, 100),
    communication: Math.min(communication, 100),
    resume: Math.min(resume, 100),
    interview: Math.min(interview, 100),
    placement: Math.min(placement, 100),
  };
}

// Course Recommendations
export interface CourseRecommendation {
  name: string;
  provider: string;
  type: 'free' | 'paid' | 'certification' | 'book' | 'practice';
  url: string;
  rating: number;
}

export function recommendCourses(career: string): CourseRecommendation[] {
  const courseMap: Record<string, CourseRecommendation[]> = {
    'AI & ML Engineer': [
      { name: 'Machine Learning by Andrew Ng', provider: 'Coursera', type: 'free', url: '#', rating: 4.9 },
      { name: 'Deep Learning Specialization', provider: 'Coursera', type: 'paid', url: '#', rating: 4.8 },
      { name: 'TensorFlow Developer Certificate', provider: 'Google', type: 'certification', url: '#', rating: 4.7 },
      { name: 'Hands-On ML with Scikit-Learn', provider: 'O\'Reilly', type: 'book', url: '#', rating: 4.8 },
      { name: 'Kaggle Competitions', provider: 'Kaggle', type: 'practice', url: '#', rating: 4.6 },
    ],
    'Full Stack Developer': [
      { name: 'The Odin Project', provider: 'Open Source', type: 'free', url: '#', rating: 4.8 },
      { name: 'Full Stack Open', provider: 'University of Helsinki', type: 'free', url: '#', rating: 4.9 },
      { name: 'AWS Certified Developer', provider: 'AWS', type: 'certification', url: '#', rating: 4.5 },
      { name: 'JavaScript: The Good Parts', provider: 'O\'Reilly', type: 'book', url: '#', rating: 4.6 },
      { name: 'LeetCode', provider: 'LeetCode', type: 'practice', url: '#', rating: 4.7 },
    ],
    'Data Scientist': [
      { name: 'Python for Data Science', provider: 'edX', type: 'free', url: '#', rating: 4.7 },
      { name: 'Applied Data Science with Python', provider: 'Coursera', type: 'paid', url: '#', rating: 4.6 },
      { name: 'IBM Data Science Professional', provider: 'IBM', type: 'certification', url: '#', rating: 4.5 },
      { name: 'Python for Data Analysis', provider: 'O\'Reilly', type: 'book', url: '#', rating: 4.7 },
      { name: 'DataCamp', provider: 'DataCamp', type: 'practice', url: '#', rating: 4.4 },
    ],
  };

  // Return courses for the specific career, or generic ones
  return courseMap[career] || [
    { name: 'CS50: Introduction to Computer Science', provider: 'Harvard', type: 'free', url: '#', rating: 4.9 },
    { name: 'Google IT Support Professional', provider: 'Google', type: 'certification', url: '#', rating: 4.6 },
    { name: 'Clean Code by Robert C. Martin', provider: 'Pearson', type: 'book', url: '#', rating: 4.8 },
    { name: 'HackerRank', provider: 'HackerRank', type: 'practice', url: '#', rating: 4.5 },
    { name: 'freeCodeCamp Full Curriculum', provider: 'freeCodeCamp', type: 'free', url: '#', rating: 4.8 },
  ];
}

// Internship Recommendations
export interface InternshipRecommendation {
  title: string;
  company: string;
  duration: string;
  type: 'remote' | 'onsite' | 'hybrid';
  stipend: string;
  skills: string[];
}

export function recommendInternships(career: string, semester: number): InternshipRecommendation[] {
  return [
    { title: `${career} Intern`, company: 'TCS Digital', duration: '3 months', type: 'hybrid', stipend: '₹15,000/month', skills: ['Python', 'SQL', 'Git'] },
    { title: `Junior ${career.split(' ')[0]} Trainee`, company: 'Infosys Springboard', duration: '6 months', type: 'remote', stipend: '₹10,000/month', skills: ['JavaScript', 'React', 'APIs'] },
    { title: `${career} Research Intern`, company: 'IIT Research Labs', duration: '2 months', type: 'onsite', stipend: '₹20,000/month', skills: ['Research', 'Data Analysis', 'Papers'] },
    { title: `${career.split(' ')[0]} Development Intern`, company: 'Wipro', duration: '3 months', type: 'remote', stipend: '₹12,000/month', skills: ['Problem Solving', 'Teamwork', 'DSA'] },
    { title: `${career} Fellow`, company: 'Microsoft ENGAGE', duration: '1 month', type: 'remote', stipend: '₹25,000/month', skills: ['Cloud', 'Full Stack', 'System Design'] },
  ];
}

// Project Recommendations
export interface ProjectRecommendation {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  duration: string;
}

export function recommendProjects(career: string): ProjectRecommendation[] {
  const projectMap: Record<string, ProjectRecommendation[]> = {
    'AI & ML Engineer': [
      { title: 'Sentiment Analysis Dashboard', description: 'Build a real-time Twitter sentiment analysis tool with NLP', difficulty: 'intermediate', technologies: ['Python', 'NLTK', 'Flask', 'Chart.js'], duration: '3 weeks' },
      { title: 'Image Classification App', description: 'Train a CNN model to classify images and deploy with REST API', difficulty: 'advanced', technologies: ['TensorFlow', 'Keras', 'React', 'FastAPI'], duration: '4 weeks' },
      { title: 'Chatbot with LLM', description: 'Create an AI chatbot using OpenAI API with conversation memory', difficulty: 'intermediate', technologies: ['Python', 'LangChain', 'Streamlit'], duration: '2 weeks' },
    ],
    'Full Stack Developer': [
      { title: 'E-Commerce Platform', description: 'Full-stack store with cart, payments, and admin panel', difficulty: 'advanced', technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'], duration: '5 weeks' },
      { title: 'Social Media Clone', description: 'Build a Twitter-like platform with real-time updates', difficulty: 'intermediate', technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'WebSocket'], duration: '4 weeks' },
      { title: 'Task Management App', description: 'Kanban board with drag-and-drop and team collaboration', difficulty: 'beginner', technologies: ['React', 'Firebase', 'Tailwind'], duration: '2 weeks' },
    ],
    'Cyber Security Analyst': [
      { title: 'Vulnerability Scanner', description: 'Build a web app vulnerability scanner using Python', difficulty: 'advanced', technologies: ['Python', 'Nmap', 'Scapy', 'Flask'], duration: '4 weeks' },
      { title: 'Password Manager', description: 'Encrypted password manager with AES-256', difficulty: 'intermediate', technologies: ['Python', 'Cryptography', 'SQLite'], duration: '2 weeks' },
      { title: 'Network Monitor', description: 'Real-time network traffic monitoring tool', difficulty: 'intermediate', technologies: ['Python', 'Wireshark API', 'Dashboard'], duration: '3 weeks' },
    ],
  };

  return projectMap[career] || [
    { title: 'Portfolio Website', description: 'Personal portfolio with projects, blog, and contact form', difficulty: 'beginner', technologies: ['HTML', 'CSS', 'JavaScript'], duration: '1 week' },
    { title: 'REST API Backend', description: 'Build a RESTful API with authentication and CRUD', difficulty: 'intermediate', technologies: ['Node.js', 'Express', 'MongoDB'], duration: '2 weeks' },
    { title: 'Data Dashboard', description: 'Interactive data visualization dashboard', difficulty: 'intermediate', technologies: ['React', 'Chart.js', 'REST API'], duration: '3 weeks' },
  ];
}

// Resume Analysis
export interface ResumeAnalysis {
  score: number;
  atsCompatibility: number;
  missingSections: string[];
  missingSkills: string[];
  improvements: string[];
  strengths: string[];
}

export function analyzeResume(hasResume: boolean, features: StudentFeatures, targetCareer: string): ResumeAnalysis {
  if (!hasResume) {
    return {
      score: 0,
      atsCompatibility: 0,
      missingSections: ['Education', 'Skills', 'Projects', 'Experience', 'Certifications', 'Summary'],
      missingSkills: CAREER_DATABASE[targetCareer]?.requiredSkills || [],
      improvements: ['Upload your resume to get detailed analysis'],
      strengths: [],
    };
  }

  const config = CAREER_DATABASE[targetCareer];
  const currentLower = features.skills.map(s => s.toLowerCase());
  const missingSkills = config?.requiredSkills.filter(s => !currentLower.includes(s.toLowerCase())) || [];
  const matchedSkills = config?.requiredSkills.filter(s => currentLower.includes(s.toLowerCase())) || [];

  const skillScore = matchedSkills.length / (config?.requiredSkills.length || 1) * 40;
  const projectScore = Math.min(features.projects * 8, 30);
  const certScore = Math.min(features.certificates * 10, 20);
  const cgpaScore = features.cgpa >= 7 ? 10 : features.cgpa >= 5 ? 5 : 2;
  const totalScore = Math.round(skillScore + projectScore + certScore + cgpaScore);

  return {
    score: Math.min(totalScore, 100),
    atsCompatibility: Math.min(totalScore + 10, 100),
    missingSections: features.projects === 0 ? ['Projects'] : [],
    missingSkills,
    improvements: [
      'Add quantitative metrics to your project descriptions',
      'Include relevant keywords from job descriptions',
      'Add links to live projects and GitHub repos',
      'Use action verbs like Developed, Optimized, Deployed',
    ],
    strengths: matchedSkills.length > 0 ? [`Strong match for ${matchedSkills.length} required skills`] : [],
  };
}

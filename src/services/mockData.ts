export interface CareerInfo {
  id: string;
  name: string;
  category: string;
  overview: string;
  futureScope: string;
  salaryRange: string;
  growthRate: string;
  dailyWork: string[];
  requiredSkills: string[];
  requiredSubjects: string[];
  exams: string[];
  colleges: string[];
  companies: string[];
  roadmap: string[];
}

export interface StreamInfo {
  id: string;
  name: string;
  overview: string;
  pros: string[];
  cons: string[];
  skillsRequired: string[];
  opportunities: string[];
  growth: string;
}

export interface CollegeInfo {
  id: string;
  name: string;
  location: string;
  ranking: string;
  fees: string;
  packageRange: string;
  exams: string[];
  courses: string[];
}

export interface ScholarshipInfo {
  id: string;
  name: string;
  provider: string;
  amount: string;
  eligibility: string;
  deadline: string;
  link: string;
}

export const MOCK_CAREERS: CareerInfo[] = [
  {
    id: "ai-engineer",
    name: "Artificial Intelligence & ML Engineer",
    category: "Technology",
    overview: "AI/ML Engineers design and build intelligent systems, training deep learning neural networks and creating algorithms that enable machines to learn from and make decisions on data.",
    futureScope: "Exponential growth. AI is disrupting every industry, leading to massive demand for engineers who understand LLMs, computer vision, and neural network tuning.",
    salaryRange: "$95,000 - $190,000 / Yr (₹12L - ₹45L+ Lakhs)",
    growthRate: "35% (Extremely High)",
    dailyWork: [
      "Designing neural network architectures",
      "Preprocessing large-scale datasets and training models",
      "Deploying ML pipelines to AWS/GCP cloud environments",
      "Collaborating with product teams to integrate AI models",
      "Tuning hyperparameters and analyzing validation metrics"
    ],
    requiredSkills: ["Python", "PyTorch / TensorFlow", "Linear Algebra & Calculus", "Probability", "SQL", "Transformers & LLMs"],
    requiredSubjects: ["Mathematics", "Physics", "Computer Science"],
    exams: ["GATE CSE", "JEE Advanced (for top IITs)", "GRE (for Masters)"],
    colleges: ["IIT Bombay", "IIT Delhi", "Stanford University", "CMU", "BITS Pilani"],
    companies: ["Google DeepMind", "OpenAI", "Microsoft", "Meta", "NVIDIA", "Tesla"],
    roadmap: [
      "Step 1: Solidify Advanced Calculus, Probability, and Linear Algebra.",
      "Step 2: Learn Python programming and data libraries (NumPy, Pandas, Scikit-learn).",
      "Step 3: Master Deep Learning concepts (CNNs, RNNs, Transformers).",
      "Step 4: Build portfolio projects: Chatbots with RAG, custom vision classifiers, or reinforcement learning agents.",
      "Step 5: Contribute to Open Source and apply for AI Research Internships."
    ]
  },
  {
    id: "software-architect",
    name: "Enterprise Software Architect",
    category: "Technology",
    overview: "Software Architects make high-level design choices and dictate technical standards, including software coding standards, tools, and platforms.",
    futureScope: "Steady high demand. As legacy systems migrate to cloud-native microservices, architects are critical to structure secure, scalable, and resilient systems.",
    salaryRange: "$130,000 - $220,000 / Yr (₹18L - ₹60L+ Lakhs)",
    growthRate: "21% (High)",
    dailyWork: [
      "Creating blueprints for cloud-native applications",
      "Choosing system databases (SQL vs NoSQL) and messaging systems",
      "Defining API gateways, security policies, and container strategies",
      "Reviewing developer codebases for architectural adherence",
      "Evaluating new tools and frameworks for enterprise feasibility"
    ],
    requiredSkills: ["System Design", "Cloud Infrastructure (AWS/GCP)", "Docker & Kubernetes", "CI/CD & DevOps", "Design Patterns"],
    requiredSubjects: ["Mathematics", "Computer Science"],
    exams: ["GATE CSE", "AWS Certified Solutions Architect", "TOGAF"],
    colleges: ["IIT Kharagpur", "IIIT Hyderabad", "MIT", "UC Berkeley", "NSUT"],
    companies: ["Amazon AWS", "Netflix", "Uber", "Salesforce", "Atlassian"],
    roadmap: [
      "Step 1: Learn core programming paradigms (OOP, Functional) and data structures.",
      "Step 2: Master SQL, NoSQL databases, and caching layers (Redis).",
      "Step 3: Build and deploy microservices with REST/gRPC and Docker.",
      "Step 4: Study system design fundamentals (scalability, load balancing, CAP theorem).",
      "Step 5: Gain industry experience as a Senior Developer and transition into architecture roles."
    ]
  },
  {
    id: "investment-banker",
    name: "Investment Banking Analyst",
    category: "Finance",
    overview: "Investment bankers help corporations, governments, and other entities raise capital and make decisions regarding Mergers & Acquisitions (M&A) and public offerings.",
    futureScope: "Strong and prestigious. While automated trading exists, human negotiation and structural finance decisions for major corporate transactions remain irreplaceable.",
    salaryRange: "$100,000 - $250,000 / Yr (₹15L - ₹50L+ Lakhs)",
    growthRate: "10% (Moderate-High)",
    dailyWork: [
      "Building financial valuation models (DCF, LBO, comps)",
      "Creating investment pitches and corporate presentation decks",
      "Conducting industry research and market due diligence",
      "Analyzing target companies for prospective Mergers & Acquisitions",
      "Facilitating public debt or equity financing deals"
    ],
    requiredSkills: ["Financial Modeling", "Corporate Valuation", "Excel Mastery", "Accounting", "Negotiation", "PPT Storytelling"],
    requiredSubjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    exams: ["CFA (Chartered Financial Analyst)", "CAT (for MBA)", "GMAT"],
    colleges: ["IIM Ahmedabad", "IIM Bangalore", "Wharton School", "London Business School", "SRCC Delhi"],
    companies: ["Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "Lazard", "Blackstone"],
    roadmap: [
      "Step 1: Obtain a strong bachelor's degree in Commerce, Economics, or Mathematics.",
      "Step 2: Learn accounting, finance basics, and master MS Excel valuation modeling.",
      "Step 3: Crack top MBA entry exams or clear CFA Level 1.",
      "Step 4: Intern at private equity firms, boutiques, or corporate finance arms.",
      "Step 5: Apply to bulge-bracket banking analyst programs."
    ]
  }
];

export const MOCK_STREAMS: StreamInfo[] = [
  {
    id: "science-pcm",
    name: "Science (PCM - Physics, Chemistry, Mathematics)",
    overview: "The most sought-after stream for students interested in engineering, technology, architecture, and pure sciences.",
    pros: [
      "Opens doors to computer science, AI, aerospace, and robotics",
      "Strong analytical and logical thinking foundation",
      "Easy transition to finance or business fields later"
    ],
    cons: [
      "Rigorous and highly competitive syllabus",
      "Requires intensive daily study and practice",
      "High competition in entrance examinations like JEE"
    ],
    skillsRequired: ["Analytical reasoning", "Problem-solving", "Mathematical aptitude", "Patience"],
    opportunities: ["Software Engineering", "AI/ML Engineer", "Data Scientist", "Aerospace Engineer", "Architect", "Defense Services"],
    growth: "Very High (driven by tech advancements)"
  },
  {
    id: "science-pcb",
    name: "Science (PCB - Physics, Chemistry, Biology)",
    overview: "Designed for students aiming for careers in medicine, surgery, biochemistry, genetics, and pharmaceutical fields.",
    pros: [
      "Highly noble, respected, and financially rewarding careers",
      "Opportunities in genetics, biotechnology, and virology",
      "Deep understanding of human and biological systems"
    ],
    cons: [
      "Medical education has a very long duration (5.5 years MBBS + 3 years MD/MS)",
      "High educational costs in private institutions",
      "Extreme competition in exams like NEET"
    ],
    skillsRequired: ["Excellent memory retention", "Observation skills", "Empathy", "Research aptitude"],
    opportunities: ["Doctor / Surgeon", "Biotechnologist", "Geneticist", "Pharmacist", "Dentist", "Neuroscientist"],
    growth: "High (health-tech & global medical challenges)"
  },
  {
    id: "commerce",
    name: "Commerce (Accounts, Business Studies, Economics)",
    overview: "For students interested in business, trade, financial markets, economy, and corporate management.",
    pros: [
      "Direct relevance to corporate operations and startups",
      "High-paying career paths like Investment Banking, CA, and Consulting",
      "Versatile choices in entrepreneurship and management"
    ],
    cons: [
      "Math is optional but highly recommended for top-tier careers",
      "Professional qualifications (like CA) have low passing percentages",
      "Heavy reliance on networking and top business school pedigree"
    ],
    skillsRequired: ["Numerical affinity", "Strategic thinking", "Communication", "Financial awareness"],
    opportunities: ["Chartered Accountant (CA)", "Investment Banker", "Management Consultant", "Product Manager", "Financial Analyst"],
    growth: "Steady & High (economic expansion & corporate scaling)"
  }
];

export const MOCK_COLLEGES: CollegeInfo[] = [
  // Maharashtra
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology, Bombay (IIT-B)",
    location: "Mumbai, Maharashtra",
    ranking: "#1 NIRF (Engineering)",
    fees: "₹2.2 Lakhs / Yr",
    packageRange: "₹18L - ₹1.2Cr+ Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "M.Tech AI/ML", "B.Tech Mechanical"]
  },
  {
    id: "vjti-mumbai",
    name: "Veermata Jijabai Technological Institute (VJTI)",
    location: "Mumbai, Maharashtra",
    ranking: "#71 NIRF (Engineering)",
    fees: "₹85,000 / Yr",
    packageRange: "₹9L - ₹44L Lakhs",
    exams: ["MHT-CET", "JEE Main"],
    courses: ["B.Tech Computer Engineering", "B.Tech IT", "M.Tech Software"]
  },
  {
    id: "coep-pune",
    name: "College of Engineering, Pune (COEP Technological University)",
    location: "Pune, Maharashtra",
    ranking: "#52 NIRF (Engineering)",
    fees: "₹90,000 / Yr",
    packageRange: "₹10L - ₹50L Lakhs",
    exams: ["MHT-CET", "JEE Main"],
    courses: ["B.Tech Computer Engineering", "B.Tech Mechanical", "B.Tech ENTC"]
  },
  {
    id: "spit-mumbai",
    name: "Sardar Patel Institute of Technology (SPIT)",
    location: "Mumbai, Maharashtra",
    ranking: "#125 NIRF (Engineering)",
    fees: "₹1.7 Lakhs / Yr",
    packageRange: "₹11L - ₹42L Lakhs",
    exams: ["MHT-CET", "JEE Main"],
    courses: ["B.Tech Computer Science", "B.Tech Data Science", "B.Tech AIML"]
  },
  {
    id: "pict-pune",
    name: "Pune Institute of Computer Technology (PICT)",
    location: "Pune, Maharashtra",
    ranking: "#130 NIRF (Engineering)",
    fees: "₹1.1 Lakhs / Yr",
    packageRange: "₹12L - ₹45L Lakhs",
    exams: ["MHT-CET", "JEE Main"],
    courses: ["B.Tech Computer Engineering", "B.Tech IT", "B.Tech ENTC"]
  },

  // Delhi & NCR
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology, Delhi (IIT-D)",
    location: "New Delhi, Delhi",
    ranking: "#2 NIRF (Engineering)",
    fees: "₹2.25 Lakhs / Yr",
    packageRange: "₹18L - ₹1.1Cr+ Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech Mathematics & Computing", "B.Tech Electrical"]
  },
  {
    id: "dtu-delhi",
    name: "Delhi Technological University (DTU)",
    location: "New Delhi, Delhi",
    ranking: "#15 NIRF (Engineering)",
    fees: "₹2.19 Lakhs / Yr",
    packageRange: "₹13L - ₹80L Lakhs",
    exams: ["JEE Main (JAC Delhi)"],
    courses: ["B.Tech Software Engineering", "B.Tech Computer Engineering", "B.Tech IT"]
  },
  {
    id: "nsut-delhi",
    name: "Netaji Subhas University of Technology (NSUT)",
    location: "New Delhi, Delhi",
    ranking: "#19 NIRF (Engineering)",
    fees: "₹2.19 Lakhs / Yr",
    packageRange: "₹13L - ₹75L Lakhs",
    exams: ["JEE Main (JAC Delhi)"],
    courses: ["B.Tech Computer Engineering", "B.Tech IT", "B.Tech ECE"]
  },
  {
    id: "srcc-delhi",
    name: "Shri Ram College of Commerce (SRCC)",
    location: "New Delhi, Delhi",
    ranking: "#1 NIRF (Commerce)",
    fees: "₹30,000 / Yr",
    packageRange: "₹8.5L - ₹35L Lakhs",
    exams: ["CUET UG"],
    courses: ["B.Com (Hons)", "B.A. Economics (Hons)"]
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences (AIIMS)",
    location: "New Delhi, Delhi",
    ranking: "#1 NIRF (Medical)",
    fees: "₹1,628 / Yr",
    packageRange: "₹15L - ₹35L Lakhs",
    exams: ["NEET UG"],
    courses: ["MBBS", "B.Sc Nursing", "M.Ch Neurosurgery"]
  },
  {
    id: "amity-noida",
    name: "Amity University, Noida",
    location: "Noida, Uttar Pradesh",
    ranking: "#35 NIRF (Overall)",
    fees: "₹3.2 Lakhs / Yr",
    packageRange: "₹5.5L - ₹30L Lakhs",
    exams: ["Amity JEE", "CUET", "Direct"],
    courses: ["B.Tech CSE", "BBA", "MBA", "BCA", "B.Sc Biotech"]
  },

  // Karnataka
  {
    id: "iisc-bangalore",
    name: "Indian Institute of Science (IISc)",
    location: "Bengaluru, Karnataka",
    ranking: "#1 NIRF (Overall)",
    fees: "₹35,000 / Yr",
    packageRange: "₹20L - ₹85L Lakhs",
    exams: ["JEE Advanced", "KVPY", "GATE"],
    courses: ["B.Sc (Research)", "B.Tech Mathematics & Computing", "M.Tech AI"]
  },
  {
    id: "rvce-bangalore",
    name: "R.V. College of Engineering (RVCE)",
    location: "Bengaluru, Karnataka",
    ranking: "#89 NIRF (Engineering)",
    fees: "₹2.5 Lakhs / Yr",
    packageRange: "₹10L - ₹56L Lakhs",
    exams: ["KCET", "COMEDK"],
    courses: ["B.Tech Computer Science", "B.Tech Information Science", "B.Tech AI & ML"]
  },
  {
    id: "bmsce-bangalore",
    name: "B.M.S. College of Engineering (BMSCE)",
    location: "Bengaluru, Karnataka",
    ranking: "#101 NIRF (Engineering)",
    fees: "₹2.3 Lakhs / Yr",
    packageRange: "₹9L - ₹48L Lakhs",
    exams: ["KCET", "COMEDK"],
    courses: ["B.Tech CSE", "B.Tech ECE", "B.Tech Data Science"]
  },
  {
    id: "christ-university",
    name: "Christ University",
    location: "Bengaluru, Karnataka",
    ranking: "#1 Private Commerce",
    fees: "₹1.8 Lakhs / Yr",
    packageRange: "₹6L - ₹22L Lakhs",
    exams: ["CUET (Christ Entrance)", "Interview"],
    courses: ["BBA Finance & Accountancy", "B.Com International Finance", "BCA"]
  },

  // Tamil Nadu
  {
    id: "iit-madras",
    name: "Indian Institute of Technology, Madras (IIT-M)",
    location: "Chennai, Tamil Nadu",
    ranking: "#1 NIRF (Overall)",
    fees: "₹2.1 Lakhs / Yr",
    packageRange: "₹17L - ₹1.0Cr+ Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech CSE", "B.Tech Data Science", "B.Tech Aerospace Engineering"]
  },
  {
    id: "nit-trichy",
    name: "National Institute of Technology, Tiruchirappalli (NIT-T)",
    location: "Tiruchirappalli, Tamil Nadu",
    ranking: "#9 NIRF (Engineering)",
    fees: "₹1.4 Lakhs / Yr",
    packageRange: "₹12L - ₹50L Lakhs",
    exams: ["JEE Main"],
    courses: ["B.Tech Computer Science", "B.Tech ECE", "B.Tech Electrical"]
  },
  {
    id: "vit-vellore",
    name: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu",
    ranking: "#11 NIRF (Engineering)",
    fees: "₹1.98 Lakhs / Yr",
    packageRange: "₹9L - ₹1.02Cr Lakhs",
    exams: ["VITEEE"],
    courses: ["B.Tech CSE", "B.Tech CSE with AI & Data Science", "B.Tech ECE", "MCA"]
  },

  // Telangana
  {
    id: "iiit-hyderabad",
    name: "International Institute of Information Technology, Hyderabad",
    location: "Hyderabad, Telangana",
    ranking: "#1 Coding Culture",
    fees: "₹3.6 Lakhs / Yr",
    packageRange: "₹22L - ₹85L Lakhs",
    exams: ["JEE Main", "UGEE"],
    courses: ["B.Tech Computer Science", "B.Tech Electronics & Comm", "Dual Degree CSE"]
  },
  {
    id: "iit-hyderabad",
    name: "Indian Institute of Technology, Hyderabad (IIT-H)",
    location: "Hyderabad, Telangana",
    ranking: "#8 NIRF (Engineering)",
    fees: "₹2.2 Lakhs / Yr",
    packageRange: "₹16L - ₹90L Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech AI", "B.Tech Electrical"]
  },

  // Punjab & Chandigarh
  {
    id: "thapar-patiala",
    name: "Thapar Institute of Engineering and Technology",
    location: "Patiala, Punjab",
    ranking: "#20 NIRF (Engineering)",
    fees: "₹3.8 Lakhs / Yr",
    packageRange: "₹10L - ₹55L Lakhs",
    exams: ["JEE Main", "12th Board Merit"],
    courses: ["B.Tech Computer Science", "B.Tech Computer Engineering", "B.Tech COE"]
  },
  {
    id: "pec-chandigarh",
    name: "Punjab Engineering College (PEC)",
    location: "Chandigarh, Punjab",
    ranking: "#87 NIRF (Engineering)",
    fees: "₹1.7 Lakhs / Yr",
    packageRange: "₹11L - ₹42L Lakhs",
    exams: ["JEE Main (JAC Chandigarh)"],
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Tech Mechanical"]
  },

  // Uttar Pradesh
  {
    id: "iit-kanpur",
    name: "Indian Institute of Technology, Kanpur (IIT-K)",
    location: "Kanpur, Uttar Pradesh",
    ranking: "#4 NIRF (Engineering)",
    fees: "₹2.1 Lakhs / Yr",
    packageRange: "₹19L - ₹1.5Cr+ Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Tech Aerospace"]
  },
  {
    id: "iit-bhu",
    name: "Indian Institute of Technology (BHU), Varanasi",
    location: "Varanasi, Uttar Pradesh",
    ranking: "#15 NIRF (Engineering)",
    fees: "₹2.2 Lakhs / Yr",
    packageRange: "₹15L - ₹1.2Cr Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech Electronics", "B.Tech Mechanical"]
  },

  // West Bengal
  {
    id: "iit-kharagpur",
    name: "Indian Institute of Technology, Kharagpur (IIT-KGP)",
    location: "Kharagpur, West Bengal",
    ranking: "#6 NIRF (Engineering)",
    fees: "₹2.2 Lakhs / Yr",
    packageRange: "₹16L - ₹1.3Cr Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech AI & Data Science", "B.Tech Electrical"]
  },
  {
    id: "ju-kolkata",
    name: "Jadavpur University",
    location: "Kolkata, West Bengal",
    ranking: "#10 NIRF (Engineering)",
    fees: "₹10,000 / Yr",
    packageRange: "₹10L - ₹85L Lakhs",
    exams: ["WBJEE"],
    courses: ["B.E. Computer Science", "B.E. Information Technology", "B.E. ETCE"]
  },

  // Rajasthan
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science, Pilani (BITS)",
    location: "Pilani, Rajasthan",
    ranking: "#1 Private Engineering",
    fees: "₹4.7 Lakhs / Yr",
    packageRange: "₹16L - ₹65L Lakhs",
    exams: ["BITSAT"],
    courses: ["B.E. Computer Science", "B.E. Electronics & Communication", "B.E. Mechanical"]
  },
  {
    id: "mnit-jaipur",
    name: "Malaviya National Institute of Technology (MNIT)",
    location: "Jaipur, Rajasthan",
    ranking: "#37 NIRF (Engineering)",
    fees: "₹1.5 Lakhs / Yr",
    packageRange: "₹11L - ₹48L Lakhs",
    exams: ["JEE Main"],
    courses: ["B.Tech Computer Science", "B.Tech ECE", "B.Tech Electrical"]
  },

  // Gujarat
  {
    id: "iit-gandhinagar",
    name: "Indian Institute of Technology, Gandhinagar (IIT-GN)",
    location: "Gandhinagar, Gujarat",
    ranking: "#18 NIRF (Engineering)",
    fees: "₹2.3 Lakhs / Yr",
    packageRange: "₹14L - ₹50L Lakhs",
    exams: ["JEE Main", "JEE Advanced"],
    courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Tech Mechanical"]
  },
  {
    id: "nirma-ahmedabad",
    name: "Nirma University",
    location: "Ahmedabad, Gujarat",
    ranking: "#85 NIRF (Engineering)",
    fees: "₹2.1 Lakhs / Yr",
    packageRange: "₹8L - ₹30L Lakhs",
    exams: ["GUJCET", "JEE Main"],
    courses: ["B.Tech Computer Science", "B.Tech IT", "MBA", "BCA"]
  }
];


export const MOCK_SCHOLARSHIPS: ScholarshipInfo[] = [
  {
    id: "reliance-foundation",
    name: "Reliance Foundation Undergraduate Scholarships",
    provider: "Reliance Foundation",
    amount: "Up to ₹2 Lakhs per annum",
    eligibility: "Students enrolled in 1st year UG degree, family income < ₹15 Lakhs, outstanding academic records.",
    deadline: "October 15, 2026",
    link: "https://www.reliancefoundation.org"
  },
  {
    id: "national-scholarship-portal",
    name: "Central Sector Scheme of Scholarship",
    provider: "Ministry of Education, Govt of India",
    amount: "₹12,000 - ₹20,000 per annum",
    eligibility: "Students above 80th percentile in Class 12, pursuing regular UG/PG course.",
    deadline: "December 30, 2026",
    link: "https://scholarships.gov.in"
  }
];

export const MOCK_COURSES = [
  // School Student Courses
  {
    id: "python-school",
    title: "Introduction to Coding with Python",
    category: "Programming",
    level: "School Student",
    duration: "8 Hours",
    rating: "4.8",
    students: "12,450",
    instructor: "Nisha Patel",
    chapters: 6
  },
  {
    id: "math-foundation",
    title: "High School Algebra & Logical Reasoning",
    category: "Mathematics",
    level: "School Student",
    duration: "10 Hours",
    rating: "4.7",
    students: "8,900",
    instructor: "Dr. R.K. Sharma",
    chapters: 8
  },
  // UG Student Courses
  {
    id: "python-basics",
    title: "Data Structures & Algorithms in Python",
    category: "Programming",
    level: "Undergraduate Student",
    duration: "18 Hours",
    rating: "4.9",
    students: "24,230",
    instructor: "Dr. Sarah Jenkins",
    chapters: 12
  },
  {
    id: "nextjs-saas",
    title: "Fullstack SaaS Design with React 19 & Next.js",
    category: "UI UX & Web Dev",
    level: "Undergraduate Student",
    duration: "24 Hours",
    rating: "4.9",
    students: "8,920",
    instructor: "Alex Rivers",
    chapters: 15
  },
  // PG Student Courses
  {
    id: "deep-learning",
    title: "Deep Learning Foundations & Transformers",
    category: "AI",
    level: "Postgraduate Student",
    duration: "30 Hours",
    rating: "4.9",
    students: "15,200",
    instructor: "Prof. Alan Turing",
    chapters: 18
  },
  {
    id: "research-methodology",
    title: "Academic Research Writing & Data Analysis",
    category: "Research",
    level: "Postgraduate Student",
    duration: "12 Hours",
    rating: "4.6",
    students: "4,120",
    instructor: "Dr. Emily Watson",
    chapters: 8
  },
  // Professional / Graduate Courses
  {
    id: "system-design",
    title: "System Design for High-Scale Architectures",
    category: "Cloud & Devops",
    level: "Working Professional",
    duration: "18 Hours",
    rating: "4.7",
    students: "19,550",
    instructor: "Markus Vane (Ex-Netflix)",
    chapters: 12
  },
  {
    id: "pmp-leadership",
    title: "Project Management & Agile Leadership",
    category: "Management",
    level: "Working Professional",
    duration: "15 Hours",
    rating: "4.8",
    students: "7,350",
    instructor: "Sarah Jenkins",
    chapters: 10
  }
];

export const MOCK_PROJECTS = [
  {
    id: "p1",
    title: "AI-Powered Smart Task Planner",
    difficulty: "Intermediate",
    category: "AI",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Gemini API"],
    description: "Build an interactive student study planner that uses LLM prompts to schedule revisions, generate study material summaries, and auto-adjust calendar events based on student fatigue.",
    roadmap: ["Define JSON schema for study events", "Integrate Gemini client mock service", "Build calendar view with Framer Motion", "Deploy to Vercel"]
  },
  {
    id: "p2",
    title: "E-Commerce Microservices Backend",
    difficulty: "Advanced",
    category: "Web Development",
    techStack: ["FastAPI", "Docker", "PostgreSQL", "Redis", "gRPC"],
    description: "Design a decoupled, event-driven ordering system handling high concurrency using a Redis queue and asynchronous communication between FastAPI nodes.",
    roadmap: ["Design database schema in SQLAlchemy", "Create Dockerfile for backend", "Implement Redis event producer", "Set up unit test suites"]
  }
];

export const MOCK_INTERNSHIPS = [
  {
    id: "int-1",
    title: "Junior AI/ML Developer Intern",
    company: "FutureLabs AI",
    location: "Remote",
    type: "Paid",
    stipend: "$800 / Month",
    duration: "6 Months",
    skills: ["Python", "PyTorch", "Hugging Face"],
    description: "Work on fine-tuning vision transformers and integrating vector databases (Pinecone) with RAG systems."
  },
  {
    id: "int-2",
    title: "Frontend Engineering Intern",
    company: "Stripe-like Fintech Inc.",
    location: "Bangalore (Hybrid)",
    type: "Paid",
    stipend: "₹35,000 / Month",
    duration: "3 Months",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    description: "Collaborate with UI designers to build high-performance checkout elements and dashboard components."
  }
];

export interface YouTubeCourse {
  id: string;
  title: string;
  channel: string;
  streamId: string;
  category: string;
  duration: string;
  videosCount: number;
  url: string;
  thumbnailId: string;
}

export const YOUTUBE_COURSES: YouTubeCourse[] = [
  // Science PCM / School
  {
    id: "yt-pcm-phy",
    title: "Class 11 Physics Complete Course for JEE/Boards",
    channel: "Physics Wallah - Alakh Pandey",
    streamId: "science-pcm",
    category: "Physics",
    duration: "45 Hours",
    videosCount: 88,
    url: "https://www.youtube.com/playlist?list=PL3aUtZ-g43GAdwQO3tpx7KszkF5K0wQfR",
    thumbnailId: "pw_phy"
  },
  {
    id: "yt-pcm-math",
    title: "JEE Main & Advanced Mathematics Complete Prep",
    channel: "Unacademy JEE",
    streamId: "science-pcm",
    category: "Mathematics",
    duration: "60 Hours",
    videosCount: 120,
    url: "https://www.youtube.com/playlist?list=PLcnK56yG6bWzP6p4q_gqg3Xy_G4mK3aO1",
    thumbnailId: "un_math"
  },
  // Science PCB
  {
    id: "yt-pcb-bio",
    title: "NEET Biology Complete Syllabus Lectures",
    channel: "Physics Wallah - NEET",
    streamId: "science-pcb",
    category: "Biology",
    duration: "50 Hours",
    videosCount: 95,
    url: "https://www.youtube.com/playlist?list=PL3aUtZ-g43GAU-G6GvF3gPwnrXzS6U0U8",
    thumbnailId: "pw_bio"
  },
  // Commerce
  {
    id: "yt-com-acc",
    title: "Class 11 Accountancy Full Course (Free)",
    channel: "Rajat Arora",
    streamId: "commerce",
    category: "Accountancy",
    duration: "25 Hours",
    videosCount: 45,
    url: "https://www.youtube.com/playlist?list=PLNdf54yZ8gGvygW4u2Y4yS2F1P2g_nJq2",
    thumbnailId: "ra_acc"
  },
  {
    id: "yt-com-eco",
    title: "Class 12 Business Studies & Economics Basics",
    channel: "Rajat Arora",
    streamId: "commerce",
    category: "Economics",
    duration: "20 Hours",
    videosCount: 38,
    url: "https://www.youtube.com/playlist?list=PLNdf54yZ8gGuN-WwJv8W9x99W-P2eG4e5",
    thumbnailId: "ra_eco"
  },
  // CS / B.Tech CSE / Coding
  {
    id: "yt-cs-python",
    title: "Python for Beginners (Full Course in Hindi)",
    channel: "CodeWithHarry",
    streamId: "btech-cse",
    category: "Programming",
    duration: "15 Hours",
    videosCount: 100,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1XjRtDYKeyHiSjaWjFZ",
    thumbnailId: "cwh_py"
  },
  {
    id: "yt-cs-web",
    title: "Sigma Web Development Course (HTML/CSS/JS/React)",
    channel: "CodeWithHarry",
    streamId: "btech-cse",
    category: "UI UX & Web Dev",
    duration: "40 Hours",
    videosCount: 120,
    url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agqAQLgdBGRcx_gEoppW_QD",
    thumbnailId: "cwh_web"
  },
  {
    id: "yt-cs-dsa",
    title: "Data Structures & Algorithms in Java / C++",
    channel: "Apna College",
    streamId: "btech-cse",
    category: "Programming",
    duration: "35 Hours",
    videosCount: 75,
    url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWsbk5gGYJXfKUjLqS7",
    thumbnailId: "ac_dsa"
  },
  {
    id: "yt-cs-sys",
    title: "System Design Fundamentals for Software Engineers",
    channel: "Gaurav Sen",
    streamId: "btech-cse",
    category: "Cloud & Devops",
    duration: "18 Hours",
    videosCount: 30,
    url: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-y1_1K0-ua",
    thumbnailId: "gs_sys"
  },
  // Mechanical / Civil
  {
    id: "yt-mech-cad",
    title: "AutoCAD Complete 2D & 3D Engineering Tutorials",
    channel: "CAD CAM Tutorials",
    streamId: "mech-diploma",
    category: "Engineering Design",
    duration: "22 Hours",
    videosCount: 50,
    url: "https://www.youtube.com/playlist?list=PLrY2D6fK-r9wYgW5M77u_G9qL_Wq-V7y1",
    thumbnailId: "cc_cad"
  },
  // Management / PM
  {
    id: "yt-mgmt-pm",
    title: "Product Management Complete Playlist",
    channel: "Product School",
    streamId: "mba-mgmt",
    category: "Management",
    duration: "14 Hours",
    videosCount: 25,
    url: "https://www.youtube.com/playlist?list=PLgM0_1-a4773kO_YqX9O2l0Z0yWl0E1wR",
    thumbnailId: "ps_pm"
  }
];

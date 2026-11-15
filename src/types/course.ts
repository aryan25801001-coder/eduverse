export interface Course {
  _id: string;
  title: string;
  provider: string; // Udemy, Coursera, YouTube, etc.
  thumbnail: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  is_free: boolean;
  rating: number;
  skills_covered: string[];
  target_audience: string[];
  url: string;
  certificate_offered: boolean;
  language: string;
}

export interface RoadmapStep {
  step_number: number;
  title: string;
  description: string;
  recommended_skills: string[];
  courses: string[];
}

export interface Roadmap {
  _id: string;
  career: string;
  description: string;
  steps: RoadmapStep[];
}

export interface LearningPath {
  _id: string;
  education_level: string;
  stream?: string;
  recommendations: string[];
}

export interface AIRecommendRequest {
  education_level: string;
  stream?: string;
  branch?: string;
  semester?: string;
  skills: string[];
  career_goal: string;
  preferred_language?: string;
  budget?: string;
}

export interface AIRecommendation {
  course_title: string;
  why_recommended: string;
  skills_to_learn: string[];
  expected_salary: string;
}

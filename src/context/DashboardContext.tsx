import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
}

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  appliedDate: string;
  salary?: string;
  notes?: string;
}

interface DashboardContextType {
  tasks: Task[];
  habits: Habit[];
  jobs: JobApplication[];
  savedCareers: string[];
  savedColleges: string[];
  savedScholarships: string[];
  addTask: (title: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  toggleHabit: (id: string) => void;
  addJob: (company: string, role: string, status: JobApplication['status'], salary?: string) => void;
  updateJobStatus: (id: string, status: JobApplication['status']) => void;
  toggleSavedCareer: (id: string) => void;
  toggleSavedCollege: (id: string) => void;
  toggleSavedScholarship: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revise Integration Calculus chapters', category: 'Revision', dueDate: '2026-07-12', completed: false, priority: 'high' },
    { id: '2', title: 'Complete AI Project description for portfolio', category: 'Project', dueDate: '2026-07-15', completed: true, priority: 'medium' },
    { id: '3', title: 'Practice 5 LeetCode arrays problems', category: 'Placement', dueDate: '2026-07-13', completed: false, priority: 'high' }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: 'h1', name: 'Code 1 Hour Daily', streak: 12, completedToday: false },
    { id: 'h2', name: 'Read Engineering Tech Articles', streak: 4, completedToday: true },
    { id: 'h3', name: 'Solve 1 Maths Calculus Problem', streak: 8, completedToday: false }
  ]);

  const [jobs, setJobs] = useState<JobApplication[]>([
    { id: 'j1', company: 'FutureLabs AI', role: 'Junior AI/ML Developer Intern', status: 'interviewing', appliedDate: '2026-07-05', salary: '$800/Mo' },
    { id: 'j2', company: 'Stripe Inc', role: 'Backend Software Engineer', status: 'saved', appliedDate: '2026-07-10', salary: '₹22L/Yr' },
    { id: 'j3', company: 'Google DeepMind', role: 'Research Fellow', status: 'applied', appliedDate: '2026-07-08', salary: '$120,000/Yr' }
  ]);

  const [savedCareers, setSavedCareers] = useState<string[]>(['ai-engineer']);
  const [savedColleges, setSavedColleges] = useState<string[]>(['iit-bombay']);
  const [savedScholarships, setSavedScholarships] = useState<string[]>(['reliance-foundation']);

  // Load from LocalStorage if exists
  useEffect(() => {
    const localTasks = localStorage.getItem('eduverse_tasks');
    const localHabits = localStorage.getItem('eduverse_habits');
    const localJobs = localStorage.getItem('eduverse_jobs');
    const localCareers = localStorage.getItem('eduverse_saved_careers');
    const localColleges = localStorage.getItem('eduverse_saved_colleges');
    const localScholarships = localStorage.getItem('eduverse_saved_scholarships');

    if (localTasks) setTasks(JSON.parse(localTasks));
    if (localHabits) setHabits(JSON.parse(localHabits));
    if (localJobs) setJobs(JSON.parse(localJobs));
    if (localCareers) setSavedCareers(JSON.parse(localCareers));
    if (localColleges) setSavedColleges(JSON.parse(localColleges));
    if (localScholarships) setSavedScholarships(JSON.parse(localScholarships));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addTask = (title: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string) => {
    const newTasks = [...tasks, { id: Date.now().toString(), title, category, dueDate, completed: false, priority }];
    setTasks(newTasks);
    saveToStorage('eduverse_tasks', newTasks);
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
    saveToStorage('eduverse_tasks', newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    saveToStorage('eduverse_tasks', newTasks);
  };

  const toggleHabit = (id: string) => {
    const newHabits = habits.map(h => {
      if (h.id === id) {
        const completed = !h.completedToday;
        return {
          ...h,
          completedToday: completed,
          streak: completed ? h.streak + 1 : Math.max(0, h.streak - 1)
        };
      }
      return h;
    });
    setHabits(newHabits);
    saveToStorage('eduverse_habits', newHabits);
  };

  const addJob = (company: string, role: string, status: JobApplication['status'], salary?: string) => {
    const newJobs = [...jobs, {
      id: Date.now().toString(),
      company,
      role,
      status,
      appliedDate: new Date().toISOString().split('T')[0],
      salary
    }];
    setJobs(newJobs);
    saveToStorage('eduverse_jobs', newJobs);
  };

  const updateJobStatus = (id: string, status: JobApplication['status']) => {
    const newJobs = jobs.map(j => j.id === id ? { ...j, status } : j);
    setJobs(newJobs);
    saveToStorage('eduverse_jobs', newJobs);
  };

  const toggleSavedCareer = (id: string) => {
    const list = savedCareers.includes(id) ? savedCareers.filter(c => c !== id) : [...savedCareers, id];
    setSavedCareers(list);
    saveToStorage('eduverse_saved_careers', list);
  };

  const toggleSavedCollege = (id: string) => {
    const list = savedColleges.includes(id) ? savedColleges.filter(c => c !== id) : [...savedColleges, id];
    setSavedColleges(list);
    saveToStorage('eduverse_saved_colleges', list);
  };

  const toggleSavedScholarship = (id: string) => {
    const list = savedScholarships.includes(id) ? savedScholarships.filter(s => s !== id) : [...savedScholarships, id];
    setSavedScholarships(list);
    saveToStorage('eduverse_saved_scholarships', list);
  };

  return (
    <DashboardContext.Provider value={{
      tasks, habits, jobs, savedCareers, savedColleges, savedScholarships,
      addTask, toggleTask, deleteTask, toggleHabit, addJob, updateJobStatus,
      toggleSavedCareer, toggleSavedCollege, toggleSavedScholarship
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

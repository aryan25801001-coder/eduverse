import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingFlow } from './pages/OnboardingFlow';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { AIMentorChat } from './components/AIMentorChat';

// Dashboard modules
import { DashboardHome } from './pages/DashboardHome';
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentProfile } from './pages/StudentProfile';
import { AssessmentPage } from './pages/AssessmentPage';
import { LearningPersonaPage } from './pages/LearningPersonaPage';
import { CareerPredictionPage } from './pages/CareerPredictionPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { StreamExplorer } from './pages/StreamExplorer';
import { CareerExplorer } from './pages/CareerExplorer';
import { CollegeExplorer } from './pages/CollegeExplorer';
import { ScholarshipHub } from './pages/ScholarshipHub';
import { LearningHub } from './pages/LearningHub';
import { StudyPlanner } from './pages/StudyPlanner';
import { ProjectExplorer } from './pages/ProjectExplorer';
import { ResumePortfolio } from './pages/ResumePortfolio';
import { PlacementHub } from './pages/PlacementHub';
import { JobTracker } from './pages/JobTracker';
import { AdminPanel } from './pages/AdminPanel';
import { LearningPersonaAssessment } from './pages/LearningPersonaAssessment';

const App: React.FC = () => {
  const { user, loading } = useAuth();
  
  // Navigation states
  const [viewState, setViewState] = useState<'landing' | 'login' | 'onboarding' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync viewState based on user session status
  React.useEffect(() => {
    if (!loading) {
      if (user) {
        if (!user.isOnboarded) {
          setViewState('onboarding');
        } else {
          setViewState('dashboard');
        }
      } else {
        setViewState('landing');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center font-sans relative overflow-hidden">
        {/* Ambient Loader Orbs */}
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-indigo-500/20 blur-[120px]" />
        
        <div className="text-center space-y-4 relative z-10">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[var(--text-secondary)] tracking-wider">Syncing EduVerse AI Session Tokens...</p>
        </div>
      </div>
    );
  }

  // 1. Landing View
  if (viewState === 'landing') {
    return (
      <LandingPage 
        onStart={() => setViewState('login')} 
        onLogin={() => setViewState('login')} 
      />
    );
  }

  // 2. Authentication View
  if (viewState === 'login') {
    return (
      <LoginPage 
        onBack={() => setViewState('landing')} 
        onSuccess={() => {
          if (user?.isOnboarded) {
            setViewState('dashboard');
          } else {
            setViewState('onboarding');
          }
        }} 
      />
    );
  }

  // 3. Onboarding Flow View
  if (viewState === 'onboarding') {
    return (
      <OnboardingFlow 
        onComplete={() => setViewState('dashboard')} 
      />
    );
  }

  // 4. Main Dashboard Workspace Layout
  const renderTabContent = () => {
    switch (activeTab) {
      case 'student-dashboard':
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case 'student-profile':
        return <StudentProfile />;
      case 'assessment':
        return <AssessmentPage />;
      case 'learning-persona-page':
        return <LearningPersonaPage />;
      case 'career-prediction':
        return <CareerPredictionPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'dashboard':
        return <DashboardHome setActiveTab={setActiveTab} />;
      case 'stream-explorer':
        return <StreamExplorer />;
      case 'career-explorer':
        return <CareerExplorer />;
      case 'college-explorer':
        return <CollegeExplorer />;
      case 'scholarship-hub':
        return <ScholarshipHub />;
      case 'learning-hub':
        return <LearningHub />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'project-explorer':
        return <ProjectExplorer />;
      case 'resume-portfolio':
        return <ResumePortfolio />;
      case 'placement-hub':
        return <PlacementHub />;
      case 'job-tracker':
        return <JobTracker />;
      case 'admin-panel':
        return <AdminPanel />;
      case 'learning-persona':
        return <LearningPersonaAssessment />;
      default:
        return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex overflow-hidden relative">
      {/* Ambient glowing background elements for premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation Drawer */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Navbar */}
        <TopNavbar 
          activeTab={activeTab} 
          onMenuClick={() => setSidebarOpen(true)} 
        />

        {/* Scrolling Inner Screen */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Persistent Floating AI Mentor chatbot */}
      <AIMentorChat />
    </div>
  );
};

export default App;

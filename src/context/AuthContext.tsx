import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'School Student' | 'Diploma Student' | 'Undergraduate Student' | 'Postgraduate Student' | 'Graduate' | 'Working Professional' | 'Admin';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  isOnboarded: boolean;
  academicProfile?: {
    classLevel: string;
    stream?: string;
    interests: string[];
    learningStyle: string;
    personality: string;
    careerGoal: string;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, name: string, role: UserRole) => Promise<boolean>;
  signup: (name: string, email: string, role: UserRole) => Promise<boolean>;
  completeOnboarding: (academicProfile: NonNullable<UserProfile['academicProfile']>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('eduverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, name: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Check if onboarded previously
    const storedProfiles = localStorage.getItem(`eduverse_profile_${email}`);
    const academicProfile = storedProfiles ? JSON.parse(storedProfiles) : undefined;
    const isOnboarded = !!academicProfile;

    const loggedInUser: UserProfile = {
      name: name || 'Aman Sharma',
      email,
      role,
      isOnboarded,
      academicProfile
    };

    setUser(loggedInUser);
    localStorage.setItem('eduverse_user', JSON.stringify(loggedInUser));
    setLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newUser: UserProfile = {
      name,
      email,
      role,
      isOnboarded: false
    };

    setUser(newUser);
    localStorage.setItem('eduverse_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const completeOnboarding = (academicProfile: NonNullable<UserProfile['academicProfile']>) => {
    if (!user) return;
    const updatedUser = { ...user, isOnboarded: true, academicProfile };
    setUser(updatedUser);
    localStorage.setItem('eduverse_user', JSON.stringify(updatedUser));
    localStorage.setItem(`eduverse_profile_${user.email}`, JSON.stringify(academicProfile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduverse_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

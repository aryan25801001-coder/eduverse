/**
 * Student Profile Page — Phase 2
 * Editable profile with photo, personal info, academic details,
 * skill sliders, interests, certifications, projects, and social links.
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { profileAPI } from '../services/api';
import { ProgressCircle } from '../components/ProgressCircle';
import { ProfileSkeleton } from '../components/LoadingSkeleton';
import {
  User, Mail, Phone, Calendar, School, BookOpen, Code, MessageSquare,
  Crown, Lightbulb, Brain, Heart, Globe, Award, Folder, Link,
  FileText, Save, Loader2, Camera, ChevronDown, Plus, X, Upload
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [activeSection, setActiveSection] = useState('personal');

  // Temp fields for list inputs
  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newProject, setNewProject] = useState({ name: '', description: '', url: '' });

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await profileAPI.get();
      setProfile(res.data || {});
    } catch (err) {
      // Use defaults
      setProfile({ name: user?.name, email: user?.email });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await profileAPI.update(profile);
      setProfile(res.data.profile || profile);
      showToast('success', 'Profile Saved', 'Your profile has been updated successfully.');
    } catch (err) {
      showToast('error', 'Save Failed', 'Could not save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateField('photo', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addToList = (field: string, value: string, setter: (v: string) => void) => {
    if (!value.trim()) return;
    const current = profile[field] || [];
    if (!current.includes(value.trim())) {
      updateField(field, [...current, value.trim()]);
    }
    setter('');
  };

  const removeFromList = (field: string, index: number) => {
    const current = [...(profile[field] || [])];
    current.splice(index, 1);
    updateField(field, current);
  };

  const addProject = () => {
    if (!newProject.name.trim()) return;
    const current = profile.projects || [];
    updateField('projects', [...current, { ...newProject }]);
    setNewProject({ name: '', description: '', url: '' });
  };

  const removeProject = (index: number) => {
    const current = [...(profile.projects || [])];
    current.splice(index, 1);
    updateField('projects', current);
  };

  if (loading) return <ProfileSkeleton />;

  const sections = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'academic', label: 'Academic', icon: School },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'social', label: 'Social & Resume', icon: Globe },
  ];

  const SkillSlider = ({ label, field, icon: Icon, color }: { label: string; field: string; icon: any; color: string }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-xs text-slate-300 font-medium">{label}</span>
        </div>
        <span className="text-xs font-bold text-white">{profile[field] || 0}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={profile[field] || 0}
        onChange={(e) => updateField(field, parseInt(e.target.value))}
        className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-brand-blue"
      />
    </div>
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Header with Photo and Completion */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-white/[0.04]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Photo Upload */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 flex items-center justify-center">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-white font-display">
                  {(profile.name || user?.name || 'S')[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          {/* Name + Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold text-white font-display">{profile.name || user?.name || 'Student'}</h2>
            <p className="text-sm text-slate-400">{profile.email || user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              {profile.college && <span className="px-2 py-0.5 text-[10px] bg-brand-blue/10 text-brand-blue rounded-full font-semibold">{profile.college}</span>}
              {profile.department && <span className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 rounded-full font-semibold">{profile.department}</span>}
              {profile.semester && <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 rounded-full font-semibold">Sem {profile.semester}</span>}
            </div>
          </div>

          {/* Profile Completion */}
          <ProgressCircle
            percentage={profile.profile_completion || 10}
            size={100}
            strokeWidth={7}
            color="#00f2fe"
            label="Profile Complete"
          />
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                activeSection === section.id
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                  : 'bg-white/[0.01] text-slate-400 border border-white/[0.04] hover:bg-white/[0.03]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* ── Personal Info Section ── */}
      {activeSection === 'personal' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-6">
          <h3 className="text-sm font-bold text-white font-display">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Full Name</label>
              <input type="text" value={profile.name || ''} onChange={(e) => updateField('name', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="Your full name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</label>
              <input type="email" value={profile.email || ''} onChange={(e) => updateField('email', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="your@email.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone</label>
              <input type="tel" value={profile.phone || ''} onChange={(e) => updateField('phone', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Date of Birth</label>
              <input type="date" value={profile.dob || ''} onChange={(e) => updateField('dob', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Gender</label>
              <select value={profile.gender || ''} onChange={(e) => updateField('gender', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm cursor-pointer">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Career Goal</label>
              <input type="text" value={profile.career_goal || ''} onChange={(e) => updateField('career_goal', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="e.g., AI/ML Engineer" />
            </div>
          </div>
        </div>
      )}

      {/* ── Academic Section ── */}
      {activeSection === 'academic' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-6">
          <h3 className="text-sm font-bold text-white font-display">Academic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><School className="w-3.5 h-3.5" /> College / University</label>
              <input type="text" value={profile.college || ''} onChange={(e) => updateField('college', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="e.g., IIT Bombay" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Department</label>
              <input type="text" value={profile.department || ''} onChange={(e) => updateField('department', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="e.g., Computer Science" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Semester</label>
              <select value={profile.semester || ''} onChange={(e) => updateField('semester', parseInt(e.target.value) || null)} className="w-full glass-input px-4 py-2.5 text-sm cursor-pointer">
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">CGPA</label>
              <input type="number" step="0.01" min="0" max="10" value={profile.cgpa || ''} onChange={(e) => updateField('cgpa', parseFloat(e.target.value) || null)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="e.g., 8.5" />
            </div>
          </div>
        </div>
      )}

      {/* ── Skills Section ── */}
      {activeSection === 'skills' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-6">
          <h3 className="text-sm font-bold text-white font-display">Skills Assessment</h3>
          <p className="text-[11px] text-slate-500">Rate your proficiency in each area (0-100%)</p>
          <div className="space-y-5">
            <SkillSlider label="Programming Skills" field="programming_skills" icon={Code} color="text-blue-400" />
            <SkillSlider label="Communication Skills" field="communication_skills" icon={MessageSquare} color="text-emerald-400" />
            <SkillSlider label="Leadership" field="leadership" icon={Crown} color="text-amber-400" />
            <SkillSlider label="Creativity" field="creativity" icon={Lightbulb} color="text-pink-400" />
            <SkillSlider label="Logical Thinking" field="logical_thinking" icon={Brain} color="text-purple-400" />
          </div>
        </div>
      )}

      {/* ── Interests, Languages, Certifications, Projects ── */}
      {activeSection === 'interests' && (
        <div className="space-y-6">
          {/* Interests */}
          <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Interests</h3>
            <div className="flex gap-2">
              <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('interests', newInterest, setNewInterest))} className="flex-1 glass-input px-4 py-2 text-sm" placeholder="Add an interest..." />
              <button onClick={() => addToList('interests', newInterest, setNewInterest)} className="px-4 py-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold rounded-xl hover:bg-brand-blue/20 transition cursor-pointer"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(profile.interests || []).map((item: string, idx: number) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-brand-blue/10 text-brand-blue text-xs rounded-full font-semibold">
                  {item}
                  <button onClick={() => removeFromList('interests', idx)} className="hover:text-white transition cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Languages</h3>
            <div className="flex gap-2">
              <input type="text" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('languages', newLanguage, setNewLanguage))} className="flex-1 glass-input px-4 py-2 text-sm" placeholder="Add a language..." />
              <button onClick={() => addToList('languages', newLanguage, setNewLanguage)} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-xl hover:bg-emerald-500/20 transition cursor-pointer"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(profile.languages || []).map((item: string, idx: number) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full font-semibold">
                  {item}
                  <button onClick={() => removeFromList('languages', idx)} className="hover:text-white transition cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Certifications</h3>
            <div className="flex gap-2">
              <input type="text" value={newCertification} onChange={(e) => setNewCertification(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addToList('certifications', newCertification, setNewCertification))} className="flex-1 glass-input px-4 py-2 text-sm" placeholder="Add a certification..." />
              <button onClick={() => addToList('certifications', newCertification, setNewCertification)} className="px-4 py-2 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-xl hover:bg-amber-500/20 transition cursor-pointer"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(profile.certifications || []).map((item: string, idx: number) => (
                <span key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 text-amber-400 text-xs rounded-full font-semibold">
                  <Award className="w-3 h-3" /> {item}
                  <button onClick={() => removeFromList('certifications', idx)} className="hover:text-white transition cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-4">
            <h3 className="text-sm font-bold text-white font-display">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="text" value={newProject.name} onChange={(e) => setNewProject(p => ({ ...p, name: e.target.value }))} className="glass-input px-4 py-2 text-sm" placeholder="Project name" />
              <input type="text" value={newProject.description} onChange={(e) => setNewProject(p => ({ ...p, description: e.target.value }))} className="glass-input px-4 py-2 text-sm" placeholder="Brief description" />
              <div className="flex gap-2">
                <input type="text" value={newProject.url} onChange={(e) => setNewProject(p => ({ ...p, url: e.target.value }))} className="flex-1 glass-input px-4 py-2 text-sm" placeholder="URL (optional)" />
                <button onClick={addProject} className="px-4 py-2 bg-purple-500/10 text-purple-400 text-xs font-semibold rounded-xl hover:bg-purple-500/20 transition cursor-pointer"><Plus className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="space-y-2">
              {(profile.projects || []).map((proj: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                  <div>
                    <p className="text-xs text-slate-200 font-semibold flex items-center gap-1.5"><Folder className="w-3.5 h-3.5 text-purple-400" /> {proj.name}</p>
                    {proj.description && <p className="text-[10px] text-slate-500 mt-0.5">{proj.description}</p>}
                  </div>
                  <button onClick={() => removeProject(idx)} className="p-1 text-slate-500 hover:text-rose-400 transition cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Social & Resume Section ── */}
      {activeSection === 'social' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-6">
          <h3 className="text-sm font-bold text-white font-display">Social & Resume</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Link className="w-3.5 h-3.5" /> GitHub Profile</label>
              <input type="url" value={profile.github || ''} onChange={(e) => updateField('github', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="https://github.com/username" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> LinkedIn Profile</label>
              <input type="url" value={profile.linkedin || ''} onChange={(e) => updateField('linkedin', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Resume URL</label>
              <input type="url" value={profile.resume_url || ''} onChange={(e) => updateField('resume_url', e.target.value)} className="w-full glass-input px-4 py-2.5 text-sm" placeholder="https://drive.google.com/your-resume" />
              <p className="text-[10px] text-slate-500">Upload your resume to Google Drive or any cloud storage and paste the link here.</p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-tr from-brand-blue to-brand-purple hover:scale-[1.02] transition font-bold text-white rounded-xl shadow-lg shadow-brand-blue/10 disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
};

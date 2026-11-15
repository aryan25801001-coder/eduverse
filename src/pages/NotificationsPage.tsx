/**
 * Notifications Page — Phase 2
 * Displays notification list with categories (Assessment Reminder, Skill Improvement,
 * New Course, Career Alert), mark-as-read actions, and filter tabs.
 */
import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { notificationAPI } from '../services/api';
import { CardSkeleton } from '../components/LoadingSkeleton';
import {
  Bell, CheckCircle2, Award, Briefcase, BookOpen, AlertCircle,
  Filter, CheckCheck, Trash2, Clock
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationAPI.getAll();
      setNotifications(res.data?.notifications || []);
    } catch (err) {
      // Fallback notifications
      setNotifications([
        { id: '1', type: 'assessment_reminder', title: '📝 Assessment Due', message: 'Take your monthly skill assessment to keep career predictions accurate.', is_read: false, created_at: new Date().toISOString() },
        { id: '2', type: 'skill_improvement', title: '📈 Skill Unlocked!', message: 'Your Programming score jumped 15% after your latest project submission.', is_read: false, created_at: new Date().toISOString() },
        { id: '3', type: 'new_course', title: '🎓 New Course Available', message: 'Deep Learning Specialization recommended based on your career goals.', is_read: true, created_at: new Date().toISOString() },
        { id: '4', type: 'career_alert', title: '🚀 High Match Found', message: 'AI/ML Engineer match increased to 96.5%!', is_read: true, created_at: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id || n._id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === id || n._id === id ? { ...n, is_read: true } : n));
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      showToast('success', 'Done', 'All notifications marked as read.');
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }
  };

  if (loading) return <CardSkeleton />;

  const getIcon = (type: string) => {
    switch (type) {
      case 'assessment_reminder': return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'skill_improvement': return <Award className="w-5 h-5 text-emerald-400" />;
      case 'new_course': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'career_alert': return <Briefcase className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.is_read;
    if (activeFilter !== 'all') return n.type === activeFilter;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue uppercase tracking-widest mb-1">
            <Bell className="w-4 h-4" /> Notification System
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Notifications & Alerts</h2>
          <p className="text-slate-400 text-xs mt-1">Stay updated with assessment reminders, skill boosts, course suggestions, and career match alerts.</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-brand-blue/10 text-brand-blue border border-brand-blue/20 rounded-xl text-xs font-semibold hover:bg-brand-blue/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'assessment_reminder', label: 'Reminders' },
          { id: 'skill_improvement', label: 'Skill Boosts' },
          { id: 'new_course', label: 'Courses' },
          { id: 'career_alert', label: 'Career Alerts' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              activeFilter === f.id
                ? 'bg-brand-blue text-[#030014] font-bold'
                : 'bg-white/[0.01] text-slate-400 border border-white/[0.04] hover:bg-white/[0.03]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="glass-panel p-6 rounded-3xl border border-white/[0.04] space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif: any) => {
            const notifId = notif.id || notif._id;
            return (
              <div
                key={notifId}
                className={`flex items-start justify-between gap-4 p-4 rounded-2xl border transition ${
                  notif.is_read
                    ? 'bg-white/[0.01] border-white/[0.03]'
                    : 'bg-white/[0.03] border-brand-blue/20 shadow-md shadow-brand-blue/5'
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] flex-shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{notif.title}</p>
                      {!notif.is_read && (
                        <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {!notif.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(notifId)}
                    className="px-3 py-1.5 bg-brand-blue/10 text-brand-blue text-[11px] font-semibold rounded-lg hover:bg-brand-blue/20 transition cursor-pointer flex-shrink-0"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <Bell className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-400">No notifications found</p>
            <p className="text-xs text-slate-600 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

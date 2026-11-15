import React from 'react';
import { Clock, Star, PlayCircle, ExternalLink, Award } from 'lucide-react';
import { Course } from '../types/course';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  idx: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="glass-panel rounded-3xl border border-slate-800/60 overflow-hidden flex flex-col hover:border-slate-600/60 hover:shadow-2xl transition-all group relative bg-[#0a0a0f]"
    >
      {/* Thumbnail */}
      <div className="h-44 w-full relative overflow-hidden flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-700" />
        <img 
          src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'} 
          alt={course.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black bg-black/70 backdrop-blur-md border border-white/10 text-white rounded-md uppercase tracking-widest z-10 shadow-lg">
          {course.provider}
        </div>
        <div className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-black rounded-md uppercase tracking-widest z-10 shadow-lg ${course.is_free ? 'bg-emerald-500/90 text-black' : 'bg-rose-500/90 text-white'}`}>
          {course.is_free ? 'FREE' : 'PREMIUM'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="space-y-2 flex-1">
          <div className="flex justify-between items-center">
             <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest block">{course.difficulty}</span>
             <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating.toFixed(1)}
             </div>
          </div>
          <h3 className="text-lg font-black text-white font-display leading-snug group-hover:text-blue-400 transition-colors line-clamp-2 mt-1" title={course.title}>
            {course.title}
          </h3>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {course.skills_covered.slice(0, 3).map((skill, i) => (
              <span key={i} className="text-[9px] font-semibold bg-[#161b22] border border-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
            {course.skills_covered.length > 3 && (
              <span className="text-[9px] font-semibold bg-[#161b22] border border-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
                +{course.skills_covered.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center py-3 mt-4 border-t border-slate-800/60 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5">
             <Clock className="w-4 h-4 text-emerald-400 shrink-0" /> <span>{course.duration}</span>
          </div>
          {course.certificate_offered && (
             <div className="flex items-center gap-1.5 text-purple-400">
               <Award className="w-4 h-4" /> <span>Certificate</span>
             </div>
          )}
        </div>

        <a 
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 mt-2 bg-[#161b22] hover:bg-blue-600 border border-slate-700 hover:border-blue-500 transition-all font-bold text-white rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] group/btn"
        >
          {course.provider === 'YouTube' ? (
             <><PlayCircle className="w-5 h-5 text-rose-500 group-hover/btn:text-white" /> Watch on YouTube</>
          ) : (
             <><ExternalLink className="w-4.5 h-4.5 text-blue-400 group-hover/btn:text-white" /> Enroll on {course.provider}</>
          )}
        </a>
      </div>
    </motion.div>
  );
};

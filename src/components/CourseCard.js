import React from 'react';
import { Link } from 'react-router-dom';

const LEVEL_COLORS = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100  text-amber-700',
  Advanced:     'bg-rose-100   text-rose-700',
};

export default function CourseCard({ course, index = 0 }) {
  const isFree = course.price === 0;

  return (
    <Link
      to={`/course/${course._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      
      <div className="relative h-44 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {course.image ? (
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-20">📚</span>
          </div>
        )}

        
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-md
          ${isFree ? 'bg-emerald-500 text-white' : 'bg-white text-ink border border-gray-200'}`}
        >
          {isFree ? 'FREE' : `$${course.price}`}
        </div>
      </div>

      
      <div className="p-5">
        
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {course.category && (
            <span className="text-xs font-semibold text-accent uppercase tracking-wide">{course.category}</span>
          )}
          {course.level && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${LEVEL_COLORS[course.level] || ''}`}>
              {course.level}
            </span>
          )}
        </div>

       
        <h3 className="font-display font-semibold text-base text-ink leading-tight mb-1.5 group-hover:text-accent transition-colors">
          {course.title}
        </h3>

       
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
          {course.description}
        </p>

        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>👤 {course.instructor || 'TBD'}</span>
          <span>⏱ {course.duration || '—'}</span>
        </div>

        
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-muted">View details →</span>
          <span className={`text-xs font-bold ${isFree ? 'text-emerald-600' : 'text-accent'}`}>
            {isFree ? 'Enrol free' : `$${course.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
}

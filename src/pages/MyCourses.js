import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { showToast } from '../utils/toast';

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    api.get('/subscriptions/my-courses')
      .then((res) => setMyCourses(res.data.myCourses))
      .catch(() => showToast('Failed to load your courses', 'error'))
      .finally(() => setLoading(false));
  }, []);

  
  if (loading) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 space-y-2.5 pt-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  
  if (myCourses.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4">📚</div>
          <h2 className="font-display text-2xl font-bold text-ink mb-2">No courses yet</h2>
          <p className="text-muted text-sm leading-relaxed">
            You haven't enrolled in any courses. Browse our catalogue and find something that excites you!
          </p>
          <Link to="/" className="inline-block mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent to-rose-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-shadow">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

 
  const totalFree = myCourses.filter((c) => c.pricePaid === 0).length;
  const totalPaid = myCourses.length - totalFree;
  const totalSpent = myCourses.reduce((acc, c) => acc + c.pricePaid, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-cream">
      
      <div className="bg-gradient-to-r from-ink to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display text-3xl font-bold">My Courses</h1>
          <p className="text-white/50 text-sm mt-1">Your enrolled courses and progress</p>
          
          <div className="flex flex-wrap gap-6 mt-6">
            {[
              ['📚', myCourses.length, 'Total Enrolled'],
              ['🎁', totalFree,        'Free Courses'],
              ['🏷️', totalPaid,        'Paid Courses'],
              ['💰', `$${totalSpent}`, 'Total Spent'],
            ].map(([icon, val, lbl]) => (
              <div key={lbl} className="bg-white/8 backdrop-blur rounded-xl px-4 py-3 min-w-[110px]">
                <p className="text-xs text-white/40 uppercase tracking-wide">{icon} {lbl}</p>
                <p className="text-xl font-bold text-white mt-0.5">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="space-y-4">
          {myCourses.map((item, i) => {
            const { course, pricePaid, originalPrice, promoApplied, subscribedAt } = item;
            if (!course) return null; // safety

            const subDate = new Date(subscribedAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            });

            return (
              <div
                key={item.subscriptionId}
                className="animate-fade-up bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex flex-col sm:flex-row">
                  
                  <div className="sm:w-56 h-40 sm:h-auto bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 relative">
                    {course.image ? (
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><span className="text-4xl opacity-20">📚</span></div>
                    )}
                   
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow">
                      ✓ Enrolled
                    </div>
                  </div>

                 
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {course.category && <span className="text-xs font-bold text-accent uppercase tracking-wide">{course.category}</span>}
                        {course.level    && <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded">{course.level}</span>}
                      </div>

                      <Link to={`/course/${course._id}`} className="font-display text-lg font-bold text-ink hover:text-accent transition-colors">
                        {course.title}
                      </Link>
                      <p className="text-sm text-muted mt-1 line-clamp-2">{course.description}</p>
                    </div>

                    
                    <div className="flex flex-wrap items-center justify-between mt-4 pt-3 border-t border-gray-100 gap-2">
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span>📅 Enrolled {subDate}</span>
                        <span>⏱ {course.duration || '—'}</span>
                        <span>👤 {course.instructor || 'TBD'}</span>
                      </div>

                     
                      <div className="flex items-center gap-2">
                        {promoApplied && originalPrice > 0 && (
                          <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
                        )}
                        <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full
                          ${pricePaid === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-accent/10 text-accent'}`}
                        >
                          {pricePaid === 0 ? 'Free' : `$${pricePaid}`}
                        </span>
                        {promoApplied && <span className="text-xs text-emerald-600 font-semibold">🏷️ Promo applied</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

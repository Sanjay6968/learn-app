import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';
import SkeletonCard from '../components/SkeletonCard';
import { showToast } from '../utils/toast';

export default function HomePage() {
  const [courses, setCourses]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [filter, setFilter]     = useState('All'); 

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data.courses))
      .catch((err) => {
        setError('Failed to load courses');
        showToast('Could not fetch courses', 'error');
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter((c) => {
    if (filter === 'Free') return c.price === 0;
    if (filter === 'Paid') return c.price > 0;
    return true;
  });

  const categories = ['All', ...new Set(courses.map((c) => c.category))];

  return (
    <div className="min-h-screen bg-cream">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-ink via-gray-900 to-gray-800 text-white">
        
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/8 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-5">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">Black Friday</span>
            <span className="text-white/60 text-xs">Use code <span className="text-gold font-bold">BFSALE25</span> for 50% off paid courses</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl">
            Learn <span className="text-accent">anything</span> at your own pace
          </h1>
          <p className="text-white/60 text-base mt-3 max-w-xl leading-relaxed">
            Explore hand-picked courses from industry experts. Some are completely free — and the paid ones are 50% off this Black Friday.
          </p>

         
          <div className="flex flex-wrap gap-6 mt-8">
            {[['7', 'Courses'], ['3', 'Free Courses'], ['50% off', 'Paid Courses']].map(([val, lbl]) => (
              <div key={lbl} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">{val}</span>
                <span className="text-white/40 text-sm">{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2">
        <div className="flex flex-wrap items-center gap-2">
         
          <div className="flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
            {['All', 'Free', 'Paid'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${filter === f ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {f}
              </button>
            ))}
          </div>

          
          <div className="flex flex-wrap gap-2 ml-2">
            {categories.slice(1).map((cat) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs text-muted font-medium shadow-sm">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">😟</p>
            <p className="text-muted">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-accent font-semibold text-sm hover:underline">Try again</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-muted">No courses match this filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <div key={course._id} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <CourseCard course={course} index={i} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

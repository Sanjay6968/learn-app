import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast';

const LEVEL_COLORS = {
  Beginner:     'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100  text-amber-700',
  Advanced:     'bg-rose-100   text-rose-700',
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [promoCode, setPromoCode]   = useState('');
  const [promoResult, setPromoResult] = useState(null); // { valid, discountedPrice, savings, originalPrice }
  const [promoError, setPromoError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  const isFree = course?.price === 0;

  // Fetch course 
  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => setCourse(res.data.course))
      .catch(() => { showToast('Course not found', 'error'); navigate('/'); })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Check if already enrolled
  useEffect(() => {
    if (!course || !isAuthenticated) return;
    api.get('/subscriptions/my-courses')
      .then((res) => {
        const enrolled = res.data.myCourses.some(
          (item) => item.course?._id === course._id
        );
        setAlreadyEnrolled(enrolled);
      })
      .catch(() => {});
  }, [course, isAuthenticated]);

  // Validate promo 
  const handleValidatePromo = async () => {
    setPromoError('');
    setPromoResult(null);
    if (!promoCode.trim()) { setPromoError('Enter a promo code'); return; }
    try {
      const res = await api.post('/subscriptions/validate-promo', { promoCode: promoCode.trim(), courseId: id });
      setPromoResult(res.data);
    } catch (err) {
      setPromoError(err.response?.data?.message || 'Invalid promo code');
    }
  };

  //  Subscribe 
  const handleSubscribe = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setSubscribing(true);
    try {
      await api.post('/subscriptions/subscribe', {
        courseId: id,
        promoCode: promoCode.trim() || undefined,
      });
      showToast(' Successfully enrolled!', 'success');
      setAlreadyEnrolled(true);
    } catch (err) {
      showToast(err.response?.data?.message || 'Subscription failed', 'error');
    } finally {
      setSubscribing(false);
    }
  };

  // Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  /* ──────────────────────────── RENDER ──────────────────── */
  return (
    <div className="min-h-screen bg-cream">
      
      <div className="relative h-56 sm:h-72 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        {course.image && (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        
        <div className="absolute top-5 right-5">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${isFree ? 'bg-emerald-500 text-white' : 'bg-white text-ink'}`}>
            {isFree ? 'FREE' : `$${course.price}`}
          </span>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {course.category && <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/20 px-2.5 py-0.5 rounded">{course.category}</span>}
            {course.level    && <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${LEVEL_COLORS[course.level]||''}`}>{course.level}</span>}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">{course.title}</h1>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="lg:flex lg:gap-10">

          
          <div className="lg:flex-1">
           
            <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
              <span>👤 <strong className="text-ink">{course.instructor || 'TBD'}</strong></span>
              <span>⏱ <strong className="text-ink">{course.duration || '—'}</strong></span>
              <span>📊 <strong className="text-ink">{course.level || '—'}</strong></span>
            </div>

           
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-display text-lg font-bold text-ink mb-3">About this course</h2>
              <p className="text-muted leading-relaxed">{course.description}</p>
            </div>

           
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-display text-lg font-bold text-ink mb-3">What you'll learn</h2>
              <ul className="space-y-2">
                {[
                  `Core concepts of ${course.category || 'the subject'}`,
                  'Hands-on real-world projects',
                  'Industry best practices',
                  'Problem-solving techniques',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="lg:w-80 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg sticky top-24 p-6">
              
              <div className="text-center mb-5">
                {alreadyEnrolled ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <p className="text-emerald-700 font-semibold text-sm">✓ You are enrolled in this course</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-end justify-center gap-2">
                      {promoResult?.valid ? (
                        <>
                          <span className="text-4xl font-bold text-ink">${promoResult.discountedPrice}</span>
                          <span className="text-lg text-gray-400 line-through mb-1">${promoResult.originalPrice}</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-ink">{isFree ? 'Free' : `$${course.price}`}</span>
                      )}
                    </div>
                    {promoResult?.valid && (
                      <span className="inline-block mt-1 text-xs font-bold text-white bg-emerald-500 px-2.5 py-0.5 rounded-full">
                        You save ${promoResult.savings}!
                      </span>
                    )}
                  </>
                )}
              </div>

             
              {!isFree && !alreadyEnrolled && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); setPromoResult(null); }}
                      placeholder="e.g. BFSALE25"
                      className={`flex-1 px-3 py-2 rounded-xl border text-sm outline-none transition-all
                        ${promoError ? 'border-red-400 bg-red-50' : promoResult?.valid ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 focus:border-accent'}`}
                    />
                    <button
                      onClick={handleValidatePromo}
                      className="px-3 py-2 rounded-xl bg-surface border border-gray-200 text-xs font-semibold text-muted hover:text-accent hover:border-accent transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError  && <p className="mt-1.5 text-xs text-red-500">{promoError}</p>}
                  {promoResult?.valid && <p className="mt-1.5 text-xs text-emerald-600 font-semibold">✓ {promoResult.label} discount applied!</p>}
                  
                  <p className="mt-2 text-xs text-gray-400">🏷️ Try <span className="font-bold text-gold">BFSALE25</span> for 50% off</p>
                </div>
              )}

              
              {!alreadyEnrolled && (
                <button
                  onClick={handleSubscribe}
                  disabled={subscribing || (!isFree && !promoResult?.valid)}
                  className={`w-full py-3 rounded-xl text-sm font-bold shadow-md transition-all duration-200
                    ${subscribing || (!isFree && !promoResult?.valid)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent to-rose-600 text-white hover:shadow-lg hover:from-rose-600 hover:to-accent'
                    }`}
                >
                  {subscribing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…
                    </span>
                  ) : isFree ? 'Enrol for Free' : 'Subscribe Now'}
                </button>
              )}

              {/* Not logged in nudge */}
              {!isAuthenticated && (
                <p className="text-center text-xs text-muted mt-3">
                  Please <a href="/login" className="text-accent font-semibold hover:underline">log in</a> to subscribe.
                </p>
              )}

              {/* Divider + perks */}
              <div className="border-t border-gray-100 mt-5 pt-4">
                <ul className="space-y-2 text-xs text-muted">
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Lifetime access</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Certificate of completion</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Download materials</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <button onClick={() => navigate('/')} className="text-sm text-muted hover:text-accent transition-colors">← Back to all courses</button>
        </div>
      </div>
    </div>
  );
}

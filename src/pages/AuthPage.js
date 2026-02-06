import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../utils/toast';

export default function AuthPage({ mode = 'login' }) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, isAuthenticated } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname || '/');
    }
  }, [isAuthenticated, navigate, location]);

  const updateField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const n = { ...prev };
      delete n[name];
      return n;
    });
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';

    if (!form.password) e.password = 'Password required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';

    if (isSignup && !form.name.trim()) e.name = 'Name required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      if (isSignup) {
        await signup(form.name.trim(), form.email.trim(), form.password);
        showToast('Account created!', 'success');
      } else {
        await login(form.email.trim(), form.password);
        showToast('Welcome back', 'success');
      }
      navigate('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0F0B0A]">

      {/* LEFT SPLIT SCREEN */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#14110F] via-[#1F1A17] to-black text-white relative overflow-hidden">

        {/* glow background */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#C0564A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C0564A]/10 rounded-full blur-3xl" />

        {/* TOP — LearnHub */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold tracking-tight">
            LearnHub
          </h2>
        </div>

        
        <div className="relative z-10 flex-1 flex items-center justify-center text-center px-6">
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            "Master skills that matter. Learn from real experts.  
            Build your future with confidence".
          </p>
        </div>

       
        <div className="relative z-10">
          <div className="flex gap-12">
            {[
              ['2,400+','Students'],
              ['15+','Courses'],
              ['4.9★','Rating']
            ].map(([v,l]) => (
              <div key={l}>
                <p className="text-3xl font-semibold">{v}</p>
                <p className="text-xs text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#F6F4EF] to-[#EEE7DE]">

        <div className="w-full max-w-md">

         
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#2C1A14] mb-2">
              {isSignup ? 'Create account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-[#7A6558]">
              {isSignup
                ? 'Join thousands of learners today'
                : 'Sign in to continue your learning journey'}
            </p>
          </div>

         
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

            <form onSubmit={handleSubmit} className="space-y-5">

              {isSignup && (
                <div>
                  <label className="text-xs font-semibold text-[#5A463B]">
                    Full Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Alice Johnson"
                    className="mt-2 w-full border border-[#E1D8CF] px-4 py-3 rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-[#C0564A]/30 outline-none transition"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#5A463B]">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="alice@example.com"
                  className="mt-2 w-full border border-[#E1D8CF] px-4 py-3 rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-[#C0564A]/30 outline-none transition"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A463B]">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full border border-[#E1D8CF] px-4 py-3 rounded-lg text-sm bg-white/60 focus:ring-2 focus:ring-[#C0564A]/30 outline-none transition"
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#3B1F1A] to-[#5C3D2E] hover:scale-[1.01] text-white py-3 rounded-lg text-sm font-semibold tracking-wide transition-all"
              >
                {loading ? 'Processing...' : isSignup ? 'Create Account' : 'Sign In'}
              </button>

            </form>

            {/* DEMO ACCOUNTS */}
            <div className="mt-8 border-t border-[#E1D8CF] pt-5">
              <p className="text-xs font-semibold text-[#7A6558] mb-3 uppercase">
                Demo accounts
              </p>

              {[
                ['monu@gmail.com', 'pass@4647'],
                ['sanjay@gmail.com', 'pass@777'],
                ['manij@gmail.com', 'pass@7878']
              ].map(([email, password]) => (
                <button
                  key={email}
                  type="button"
                  onClick={() => setForm({ name:'', email, password })}
                  className="block w-full text-left text-sm py-1 text-[#2C1A14] hover:text-[#C0564A] transition"
                >
                  {email}
                  <span className="text-[#7A6558]"> / {password}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SWITCH */}
          <p className="mt-6 text-center text-sm text-[#7A6558]">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link
              to={isSignup ? '/login' : '/signup'}
              className="text-[#C0564A] font-semibold hover:underline"
            >
              {isSignup ? 'Log in' : 'Sign up'}
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

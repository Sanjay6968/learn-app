import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = isAuthenticated
    ? [
        { to: '/',            label: 'Courses' },
        { to: '/my-courses', label: 'My Courses' },
      ]
    : [];

  const isActive = (to) => location.pathname === to;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

         
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-rose-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="font-display font-700 text-lg text-ink">
              Learn<span className="text-accent">Hub</span>
            </span>
          </Link>

         
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive(link.to)
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-muted hover:text-ink hover:bg-surface'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted font-medium">{user.name || user.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 rounded-lg border border-gray-200 text-sm text-muted hover:text-accent hover:border-accent transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"  className="px-4 py-1.5 text-sm text-muted hover:text-ink transition-colors font-medium">Login</Link>
                <Link to="/signup" className="px-4 py-1.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-rose-600 transition-colors shadow-sm">Sign Up</Link>
              </>
            )}
          </div>

          
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-ink transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-ink my-1.5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-ink transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive(link.to) ? 'bg-accent text-white' : 'text-muted hover:text-ink hover:bg-surface'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2">
            {isAuthenticated ? (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-500 font-medium">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login"  onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-muted">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-accent font-semibold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display', serif"],
        body: ["'Inter', sans-serif"],
      },
      colors: {
        cream: '#FAF8F5',
        ink: '#1A1A2E',
        accent: '#E94560',
        gold: '#F5A623',
        muted: '#6B7280',
        card: '#FFFFFF',
        surface: '#F0EDE8',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fadeIn 0.4s ease both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s cubic-bezier(.22,1,.36,1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(233,69,96,0.4)' },
          '50%':      { boxShadow: '0 0 20px 6px rgba(233,69,96,0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

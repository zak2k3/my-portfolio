/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        neon: {
          cyan: '#00f5ff',
          purple: '#bf00ff',
          green: '#00ff9f',
          pink: '#ff0080',
          yellow: '#ffff00',
        },
        dark: {
          900: '#020408',
          800: '#050d14',
          700: '#0a1628',
          600: '#0f2040',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'text-shimmer': 'textShimmer 3s linear infinite',
        'orbit': 'orbit 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' },
          to: { textShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 80px #00f5ff' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '50%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff, 0 0 60px #00f5ff' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
        'neon-glow': 'radial-gradient(ellipse at center, rgba(0,245,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}

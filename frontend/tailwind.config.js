/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alice: '#f0f8ff',
        glass: 'rgba(255,255,255,0.15)',
        glassBorder: 'rgba(255,255,255,0.2)',
        darkSurface: '#16162a',
        darkGlass: 'rgba(255,255,255,0.05)',
        darkBorder: 'rgba(255,255,255,0.08)',
        textPrimary: '#1a1a2e',
        textInverted: '#e8e8f0',
        accent: '#6366f1',
        accentSoft: '#818cf8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 41, 55, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0,0,0,0.4)',
        'neumorphic': '20px 20px 60px #d1d9e6, -20px -20px 60px #ffffff',
        'neumorphic-dark': '20px 20px 60px #0a0a14, -20px -20px 60px #1f1f35',
        'neumorphic-inset': 'inset 8px 8px 16px #d1d9e6, inset -8px -8px 16px #ffffff',
        'neumorphic-inset-dark': 'inset 8px 8px 16px #0a0a14, inset -8px -8px 16px #1f1f35',
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px',
      },
    },
  },
  plugins: [],
};

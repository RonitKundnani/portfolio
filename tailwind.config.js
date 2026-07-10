/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#05080a',
        panel: '#0a1012',
        cyan: {
          DEFAULT: '#5eead4',
          dim: 'rgba(94,234,212,0.35)',
          faint: 'rgba(94,234,212,0.08)',
        },
        amber: '#f5a623',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

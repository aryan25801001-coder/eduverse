import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-space-grotesk)', 'sans-serif'], // Default to Space Grotesk
      },
      colors: {
        primary: '#050816',
        secondary: '#02030A',
        card: 'rgba(8, 17, 36, 0.4)', // Frost glass base
        accent: '#00FFB2', // Main Neon Green
        neon: {
          green: '#00FFB2',
          blue: '#3BA5FF',
          yellow: '#E7FF43',
          red: '#FF3D6E',
          cyan: '#00f2ff',
          purple: '#bc00ff',
        },
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 178, 0.4)',
        'glow-blue': '0 0 20px rgba(59, 165, 255, 0.4)',
        'glow-yellow': '0 0 20px rgba(231, 255, 67, 0.4)',
        'glow-red': '0 0 20px rgba(255, 61, 110, 0.4)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s infinite',
        float: 'float 6s ease-in-out infinite',
        'light-sweep': 'lightSweep 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(2deg)' },
        },
        lightSweep: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
    },
  },
  plugins: [],
}
export default config

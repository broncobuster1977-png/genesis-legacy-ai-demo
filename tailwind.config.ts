/* LEGACY AI TAILWIND CONFIG - CORRECTED TO SPEC */
/* Per Architecture Doc Section 4.1 - Color Palette */

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Legacy AI Brand Colors - FROM SPEC SECTION 4.1
      colors: {
        legacy: {
          navy: '#1B3A5C',       // Primary text, headings, navigation
          blue: '#2E75B6',       // Primary actions, links, accent
          lightblue: '#E8F0FE',  // Backgrounds, cards, subtle highlights
          darkgray: '#333333',   // Body text
          medgray: '#6B7280',    // Secondary text, placeholders
          lightgray: '#E5E7EB',  // Borders, dividers
          neutral: '#F9FAFB',    // Light backgrounds, neutral sections
          green: '#2E7D32',      // Success states only
          red: '#CC0000',        // Errors only
        },
        // Keep shadcn compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: '#2E75B6',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#E8F0FE',
          foreground: '#1B3A5C'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: '#CC0000',
          foreground: '#FFFFFF'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // Typography - Inter per spec Section 4.2
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      // Subtle animations per spec - nothing flashy
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

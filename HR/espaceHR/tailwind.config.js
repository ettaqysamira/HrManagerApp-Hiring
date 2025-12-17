/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)', 
        input: 'var(--color-input)', 
        ring: 'var(--color-ring)', 
        background: 'var(--color-background)', 
        foreground: 'var(--color-foreground)', 
        primary: {
          DEFAULT: 'var(--color-primary)', 
          foreground: 'var(--color-primary-foreground)', 
        },
        secondary2:{
          DEFAULT: 'var(--color-secondary2)',

        },
        alert:{
          DEFAULT: 'var(--color-alert)',

        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', 
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', 
          foreground: 'var(--color-destructive-foreground)', 
        },
        muted: {
          DEFAULT: 'var(--color-muted)', 
          foreground: 'var(--color-muted-foreground)', 
        },
        accent: {
          DEFAULT: 'var(--color-accent)', 
          foreground: 'var(--color-accent-foreground)', 
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--color-card)', 
          foreground: 'var(--color-card-foreground)',
        },
        card2:{
          DEFAULT:'var(--color-card2)'

        },
        success: {
          DEFAULT: 'var(--color-success)', 
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)', 
          foreground: 'var(--color-warning-foreground)', 
        },
        error: {
          DEFAULT: 'var(--color-error)', 
          foreground: 'var(--color-error-foreground)', 
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.2s infinite',
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E2A47',
        'primary-light': '#A2B9D6',  
        secondary: '#4b5563',
        'light-bg': '#F5F5F5',
        'gray-border': '#e0e0e0',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.12)',
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out forwards',
        bounceDelayed: 'bounceCustom 1s ease-in-out 2s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceCustom: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  lightMode: true,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  themes: ['light'],
  theme: {
    extend: {
      zIndex: {
        100: '100',
      },
      fontFamily: {
        sacramento: ['Sacramento', 'system-ui'],
        cabinetGrotesk: ['Cabinet Grotesk', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        neuemachina: ['PPNeueMachina'],
      },
      colors: {
        // New color palette based on the image
        'custom-cream': '#FAF5E9',
        'custom-maroon': '#701215',
        'custom-black': '#181213',
        'custom-white': '#FFFEFE',
        'custom-gold': '#D7B65A',

        // Keep existing system colors
        'custom-grey': '#D9D9D9',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      scale: {
        300: '3.0',
      },
      spacing: {
        12: '3rem',
        16: '4rem',
        24: '6rem',
        32: '8rem',
        48: '12rem',
        64: '16rem',
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '7xl': '7rem',
        '8xl': '9rem',
      },
      backgroundImage: {
        // You can add background patterns here if needed
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('daisyui'), require('preline/plugin')],
}

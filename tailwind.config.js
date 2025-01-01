/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./projects/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      rotate: {
        '50': '50deg',
      },
      skew: {
        '15': '15deg',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0px' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0px' },
        },
        "glow-animation": {
          "0%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "400% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
        ani507: {
          '10%': {
            width: '0',
            transform: 'rotate(-45deg) translate(-100%, -50%)'
          },
          '20%': {
            width: '0',
            transform: 'rotate(0) translate(-100%, 85%)'
          },
          '60%': {
            width: '100%',
            transform: 'rotate(0) translate(0, 85%)'
          },
          '100%': {
            width: '100%',
            transform: 'rotate(0) translate(0, 0)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-animation": "glow-animation 20s linear infinite",
        'ani507': 'ani507 0.6s forwards'
      },
      boxShadow: {
        'button': 'rgba(0, 0, 0, 0.35) 0 0 0.5em'
      },
      backgroundImage: {
        "glowing-button": "linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)",
        "shadow-button": "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%)"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ['group-hover'],
      translate: ['group-hover'],
      scale: ['group-hover'],
      rotate: ['group-hover'],
      backgroundPosition: ['hover'],
      backgroundSize: ['hover'],
      textColor: ['group-hover'],
      opacity: ['group-hover'],
      fontSize: ['group-hover'],
      width: ['group-hover'],
      height: ['group-hover'],
    }
  },
  plugins: [require("tailwindcss-animate")],
};

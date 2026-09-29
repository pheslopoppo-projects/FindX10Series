/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moon-white': '#F5F5F7',
        'light-titanium': '#D8D8E0',
        'warm-orange': '#E36940',
        'titanium-dark': '#333336',
        // Supporting utility tints
        velvet: {
          glass: 'rgba(255, 255, 255, 0.7)',
          border: '#D8D8E0',
          dark: '#333336',
          muted: '#6E6E73',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['"OPPO Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        brand: ['"OPPO Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Brand Display"', '"OPPO Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'velvet': '0 8px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'velvet-hover': '0 14px 40px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}

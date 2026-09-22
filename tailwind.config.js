/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F8F4',
        paperDim: '#EEF1EA',
        ink: '#17231F',
        inkSoft: '#596760',
        tram: {
          DEFAULT: '#31735C',
          light: '#DFF2E9',
          dark: '#1D5542'
        },
        dusk: {
          DEFAULT: '#5B6B93',
          light: '#E7E9F2',
          dark: '#3F4A6B'
        },
        caution: {
          DEFAULT: '#B6763A',
          light: '#F5E9DC',
          dark: '#8A5726'
        },
        line: '#DCE2DA'
      },
      fontFamily: {
        display: ['Iowan Old Style', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      borderRadius: {
        card: '14px'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(23, 35, 31, 0.04), 0 14px 38px rgba(23, 35, 31, 0.07)',
        lift: '0 22px 60px rgba(23, 35, 31, 0.12)'
      },
      maxWidth: {
        content: '72rem'
      }
    }
  },
  plugins: []
};

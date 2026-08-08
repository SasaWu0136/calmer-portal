/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F3F4F1',
        paperDim: '#EBEDE7',
        ink: '#262A28',
        inkSoft: '#586058',
        tram: {
          DEFAULT: '#3F6E5D',
          light: '#E4EEE9',
          dark: '#2C4F42'
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
        line: '#D8DAD3'
      },
      fontFamily: {
        display: ['Iowan Old Style', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
      },
      borderRadius: {
        card: '14px'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(38, 42, 40, 0.04), 0 4px 16px rgba(38, 42, 40, 0.04)'
      },
      maxWidth: {
        content: '72rem'
      }
    }
  },
  plugins: []
};

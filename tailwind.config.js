module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  // important: '#root',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF7F00',
        secondary: { 700: '#777777', 600: '#b9b9b9', 500: '#DDDDDD', 300: '#F5F5F5' },
      },
      fontFamily: {
        'noto-sans-kr': ['"Noto Sans KR"', 'sans-serif'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.font-default': {
          fontFamily: ['noto-sans-kr', 'noto-sans'],
        },
        '.font-Logo': {
          '@apply font-default': {},
          fontSize: '3.125rem',
          fontWeight: '800',
          fontStyle: 'italic',
        },
        '.font-h1': {
          '@apply font-default': {},
          fontSize: '1.875rem',
          fontWeight: '600',
        },
        '.font-h2': {
          '@apply font-default': {},
          fontSize: '1.5rem',
          fontWeight: '600',
        },
        '.font-body1': {
          '@apply font-default': {},
          fontSize: '1.125rem',
          fontWeight: ' 500',
        },
        '.font-body1-bold': {
          '@apply font-default': {},
          fontSize: '1.125rem',
          fontWeight: '600',
        },
        '.font-placeholder': {
          '@apply font-default': {},
          fontSize: '1rem',
          fontWeight: '100',
        },
      });
    },
  ],
};

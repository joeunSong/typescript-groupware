module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF7F00',
        secondary: '#C7C7C7',
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
          weight: '600',
        },
        '.font-h2': {
          '@apply font-default': {},
          fontSize: '1.5rem',
          weight: '600',
        },
        '.font-body1': {
          '@apply font-default': {},
          fontSize: '1.125rem',
          weight: ' 500',
        },
        '.font-body1-bold': {
          '@apply font-default': {},
          fontSize: '1.125rem',
          weight: '600',
        },
        '.font-placeholder': {
          '@apply font-default': {},
          fontSize: '1rem',
          weight: '100',
        },
      });
    },
  ],
};

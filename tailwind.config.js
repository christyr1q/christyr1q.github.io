const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./src/**/*.njk', './src/**/*.svg'],
    layers: ['components', 'utilities'],
    options: {
      safelist: ['header-shadow', '-translate-y-full', 'hidden']
    }
  },
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      mousebirdBlue: '#00557e',
      gray: {
        100: '#f7fafc',
        200: '#edf2f7',
        300: '#e2e8f0',
        400: '#cbd5e0',
        500: '#a0aec0',
        600: '#718096',
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c'
      },
      teal: colors.teal
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'img': {
              'margin-top': '0',
              'margin-bottom': '0'
            },
            'figure': {
              'margin-top': '0',
              'margin-bottom': '0'
            },
            'h1': {
              fontWeight: '700'
            },
            'blockquote': {
              fontWeight: 'normal',
              color: theme('colors.gray.700')
            },  
            'blockquote p:first-of-type::before': {
              content: ''
            },
            'blockquote p:last-of-type::after': {
              content: ''
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};

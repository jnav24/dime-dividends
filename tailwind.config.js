module.exports = {
  purge: {
    content: [
      './resources/**/*.blade.php',
      './resources/**/*.js',
      './resources/**/*.tsx',
      './resources/**/*.ts',
    ],
    options: {
      safelist: [/^(sm:|md:)?grid-cols-/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        danger: '#C62828',
        'dark-danger': '#4B0F0F',
        'dark-primary': '#264653',
        'dark-secondary': '#A88D3E',
        primary: '#45ADA8',
        secondary: '#EFC958',
      },
      minHeight: {
        '64': '16rem',
      },
      maxHeight: {
        '48': '12rem',
      },
      maxWidth: {
        '32': '8rem',
      },
      opacity: {
        '85': '0.85',
        '95': '0.95',
      },
      width: {
        '100': '25rem',
        '150': '38rem',
        '200': '50rem',
        '250': '63rem',
        '300': '75rem',
      },
      zIndex: {
        '100': 100,
      },
    },
    fontFamily: {
      body: ['Nunito', 'sans-serif'],
      header: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  variants: {
    backgroundColor: ['hover', 'active', 'responsive', 'even'],
    borderColor: ['hover', 'active', 'focus'],
    extend: {},
  },
  plugins: [],
}

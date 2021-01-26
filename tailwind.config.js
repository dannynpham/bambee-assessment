module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#481d72',
      'primary-shade-1': '#3d1266',
      'primary-shade-2': '#260347',
      'primary-tint-1': '#6b4392',
      'primary-tint-2': '#8e6baf',
      'primary-tint-3': '#b096cb',
      'primary-tint-4': '#d3c3e3',
      'primary-tint-5': '#f6f4f8',
      secondary: '#16a7a7',
      'secondary-shade-1': '#099393',
      'secondary-shade-2': '#005d5d',
      'secondary-tint-1': '#3ac0c0',
      'secondary-tint-2': '#61d6d6',
      'secondary-tint-3': '#91e7e7',
      'secondary-tint-4': '#c2f4f4',
      'secondary-tint-5': '#f8fdfd',
      black: '#121212',
      'gray-0': '#333234',
      'gray-1': '#3f3e40',
      'gray-2': '#4f4f4f',
      'gray-3': '#828282',
      'gray-4': '#c2c2c2',
      'gray-5': '#e0e0e0',
      'gray-6': '#f2f2f2',
      'gray-7': '#fafafa',
      white: '#fff',
      transparent: 'transparent',
      error: '#b0223e',
      'error-light': '#fdf2f4',
      'error-light-ghost': '#ff6c89',
      warning: '#ee8a2e',
      'warning-light': '#fffdf2',
      success: '#00ab82',
      'success-light': '#f2fdfb',
      info: '#0988b0',
      'info-light': '#eff9fc',
      geyser: '#cde0df',
      tuberose: '#f7f2dc',
      gingerrr: '#ffaa00',
      rose: '#e25959',
      tangerine: '#bf4228',
      maroon: '#680021',
      puce: '#7e245c',
      inevitable: '#481d72',
      virginia: '#002855',
      mosaic: '#006880',
      eastern: '#1991a9',
      caribbean: '#16a7a7',
      evergreen: '#004851',
      intercom: '#276efa',
      facebook: '#3b5998',
      twitter: '#1da1f2',
      google: '#4285f4',
      linkedin: '#0077b5',
      trustpilot: '#007f4e',
      youtube: '#ff0000',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

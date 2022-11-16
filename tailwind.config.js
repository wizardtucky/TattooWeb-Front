/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
      },
      borderRadius: {
        2: '2px',
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
      },
    },
  },
  plugins: [],
}

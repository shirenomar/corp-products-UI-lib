/** @type {import('tailwindcss').Config} */

function withOpacity(cssVar, fallbackRgb) {
  return ({ opacityValue }) =>
    opacityValue !== undefined
      ? `rgba(${fallbackRgb}, ${opacityValue})`
      : `var(${cssVar})`;
}

module.exports = {
  content: ['./projects/ui-components-lib/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
        },
        secondary: 'var(--secondary)',
        rose: 'var(--pink-5)',
        light_purple: 'var(--purple-light)',
        light_red: 'var(--danger-5)',
        dark_gray: 'var(--gray-700)',
        purple: {
          1: 'var(--purple-1)',
          2: 'var(--purple-2)',
          3: 'var(--purple-3)',
          4: 'var(--purple-4)',
          200: 'var(--purple-200)',
          500: 'var(--purple-500)',
          600: 'var(--purple-600)',
          700: 'var(--purple-700)',
          // rgb for #4f018b so opacity modifiers like /5 work with @apply
          800: withOpacity('--purple-500', '79, 1, 139'),
          900: 'var(--purple-dark)',
          dark: 'var(--purple-dark)',
          light: 'var(--purple-light)',
          light2: 'var(--purple-light-2)',
          light3: 'var(--purple-light-3)',
          light4: 'var(--purple-light-4)',
        },
        gray: {
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)',
          8: 'var(--gray-8)',
          9: 'var(--gray-9)',
          10: 'var(--gray-10)',
          11: 'var(--gray-11)',
          20: 'var(--gray-20)',
          25: 'var(--gray-25)',
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          350: 'var(--gray-350)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          750: 'var(--gray-750)',
          900: 'var(--gray-900)',
          950: 'var(--gray-950)',
          975: 'var(--gray-975)',
          dark: 'var(--gray-dark)',
        },
        black: {
          DEFAULT: 'var(--black)',
          5: 'var(--black-5)',
          10: 'var(--black-10)',
          20: 'var(--black-20)',
          100: 'var(--black-100)',
          200: 'var(--black-200)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          2: 'var(--danger-2)',
          5: 'var(--danger-5)',
          6: 'var(--danger-6)',
          7: 'var(--danger-7)',
          8: 'var(--danger-8)',
          light: 'var(--danger-light)',
          light2: 'var(--danger-light2)',
          'light-3': 'var(--danger-light-3)',
        },
        success: {
          DEFAULT: 'var(--success)',
          1: 'var(--success-1)',
          6: 'var(--success-6)',
          dark: 'var(--success-dark)',
          light: 'var(--success-light)',
        },
        warning: {
          dark: 'var(--warning-dark)',
          500: 'var(--warning-500)',
          light: 'var(--warning-light)',
        },
      },
      fontSize: {
        13: '13px',
        20: '20px',
        24: '24px',
        md: '16px',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
// module.exports = {
//   theme: {
//     screens: {
//       sm: '480px',
//       md: '768px',
//       lg: '976px',
//       xl: '1440px',
//     },
//     colors: {
//       'primary-default': '#17af6d',
//       'secondary-default': '#cb363e',
//       'error': '#ff485e',
//       'logo': '#fae100',
//       'surface-dark': '#f5f5f5',
//       'tertiary-default': '#777',
//       'line': '#d9d9d9',
//       'placeholder': '#bfbfbf',
//       'font-sub-default': '#777',
//       'font-default': '#232527',
//       'surface-dark': '#f5f5f5',
//       'surface-line': '#e2e2e2',
//     },
//     fontFamily: {
//       sans: ['Graphik', 'sans-serif'],
//       serif: ['Merriweather', 'serif'],
//     },
//     extend: {
//       spacing: {
//         128: '32rem',
//         144: '36rem',
//       },
//       borderRadius: {
//         '4xl': '2rem',
//       },
//     },
//   },
// };
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        3: '3 3 0%', // ✅ `flex-3` 추가
        8: '8 8 0%', // ✅ `flex-8` 추가
      },
      spacing: {
        15: '3.75rem',
        17: '4.25rem',
        140: '35rem',
      },

      borderRadius: {
        '4xl': '2rem',
      },
      flexGrow: {
        3: '3',
        8: '8',
      },
      fontFamily: {
        // Pretendard 폰트 등록
        pretendard: ['"Pretendard Variable"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e5f5ed',
          100: '#c1e6dd',
          200: '#98d6b5',
          300: '#6cc798',
          400: '#48bb83',
          default: '#17af6d', // 기본 primary 색상
          600: '#0eaf6d',
          dark: '#038356',
          800: '#007c4a',
          900: '#005345',
        },
        secondary: {
          default: '#cb363e',
        },
        error: '#ff485e',
        logo: '#fae100',
        surface: {
          dark: '#f5f5f5',
          line: '#e2e2e2',
          default: '#ffffff',
        },
        tertiary: {
          default: '#777',
        },
        line: '#d9d9d9',
        placeholder: '#bfbfbf',
        disabled: '#e2e2e2',
        kakao: '#FAE100',
        gray99: '#999999',
        font: {
          sub: '#777',
          default: '#232527',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // ✅ Tiptap과 호환되도록 typography 플러그인 추가
  ],
};

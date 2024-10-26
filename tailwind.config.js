/** @type {import('tailwindcss').Config} */
module.exports = {
	safelist: ['mobile', 'desktop'],
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			boxShadow: {
				custom: '0 35px 50px -15px rgba(194, 195, 214, 0.5)',
				// darkMode
				dCustom: '0 35px 50px -15px rgba(0, 0, 0, 0.5)',
			},
			colors: {
				lineThroughColor: '#d1d2da',
				secondColor: '#9495a5',
				primeColor: '#494c6b',
				accentColor: '#3a7cfd',
				white: '#ffffff',
				borderColor: '#e3e4f1',
				editingBgColor: '#90ee90',
				// darkMode
				dPrimeColor: '#c8cbe7',
				dSecondColor: '#5b5e7e',
				dLineThroughColor: '#4d5067',
				dBorderColor: '#393a4b',
				dSecondBgColor: '#25273d',
				dPrimeBgColor: '#171823',
				dEditingBgColor: '#32CD32',
			},
			backgroundImage: {
				'custom-gradient': 'linear-gradient(135deg, #55ddff 0%, #c058f3 100%)',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite linear',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};

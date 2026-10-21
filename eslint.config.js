const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const globals = require('globals');

module.exports = [
	{
		ignores: ['build/**', 'coverage/**', '**/*.test.{js,jsx}'],
	},
	js.configs.recommended,
	react.configs.flat.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			curly: 'error',
			quotes: ['warn', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
			'no-unused-vars': ['error'],
			semi: ['error'],
			'no-use-before-define': 'error',
			'no-undef': 'error',
			'no-multi-spaces': 'warn',
			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react/no-unescaped-entities': 'off',
			indent: ['warn', 'tab', { SwitchCase: 1 }],
		},
	},
];

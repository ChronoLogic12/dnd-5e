import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['build/**', 'coverage/**', '**/*.test.{js,jsx,ts,tsx}'],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
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
			semi: ['error'],
			'no-use-before-define': 'error',
			'no-multi-spaces': 'warn',
			'react/prop-types': 'off',
			'react/display-name': 'off',
			'react/no-unescaped-entities': 'off',
			indent: ['warn', 'tab', { SwitchCase: 1 }],
		},
	},
	{
		files: ['**/*.{js,jsx}'],
		rules: {
			'no-undef': 'error',
		},
	}
);

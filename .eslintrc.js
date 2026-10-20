module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react"],
	settings: {
		react: { version: "detect" },
	},
	ignorePatterns: ["**/*.test.js"],
	rules: {
		curly: "error",
		quotes: ["warn", "single", { allowTemplateLiterals: true, avoidEscape: true }],
		"no-unused-vars": ["error"],
		semi: ["error"],
		"no-use-before-define": "error",
		"no-undef": "error",
		"no-multi-spaces": "warn",
		"react/prop-types": "off",
		"react/display-name": "off",
		"react/no-unescaped-entities": "off",
		indent: ["warn", "tab", { SwitchCase: 1 }],
	},
};

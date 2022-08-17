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
	ignorePatterns: ["**/*.test.js"],
	rules: {
		curly: "error",
		quotes: ["warn", "single", { allowTemplateLiterals: true, avoidEscape: true }],
		"no-unused-vars": ["error"],
		semi: ["error"],
		"no-use-before-define": "error",
		"no-undef": "error",
		"no-multi-spaces": "warn",
		indent: ["warn", "tab"],
		ignoreTranspilerName: true,
	},
};

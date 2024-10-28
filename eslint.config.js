import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: { globals: globals.browser },
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'no-undef': 'off',
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn',
			'no-console': 'warn',
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		},
		plugins: {
			prettier: pluginPrettier,
		},
	},
];

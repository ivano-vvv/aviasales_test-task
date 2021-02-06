module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'eslint-config-airbnb-typescript',
		'prettier',
		'eslint-config-prettier',
	],
};

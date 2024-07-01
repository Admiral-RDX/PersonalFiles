module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'import/no-extraneous-dependencies': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};

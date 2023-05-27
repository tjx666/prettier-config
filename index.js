const plugins = [
    '@prettier/plugin-xml',
    // some plugins maybe added in the future
    // https://github.com/hosseinmd/prettier-plugin-jsdoc/issues/135
    // https://github.com/un-ts/prettier/tree/master/packages/sh
    // https://github.com/un-ts/prettier/tree/master/packages/pkg
    // https://github.com/un-ts/prettier/tree/master/packages/autocorrect
];

module.exports = {
    endOfLine: 'auto',
    printWidth: 100,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    plugins: plugins.map((plugin) => require.resolve(plugin)),
    overrides: [
        // https://github.com/prettier/prettier/issues/5322#issuecomment-1276302630
        {
            files: '*.svg',
            options: {
                parser: 'html',
            },
        },
        {
            files: ['*.{yml,yaml,md}'],
            options: { tabWidth: 2 },
        },
    ],
};

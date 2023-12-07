const plugins = [
    // https://github.com/un-ts/prettier/issues/276
    // 'prettier-plugin-autocorrect',

    // https://github.com/prettier/plugin-xml
    '@prettier/plugin-xml',
    // https://github.com/hosseinmd/prettier-plugin-jsdoc
    'prettier-plugin-jsdoc',

    // some plugins maybe added in the future
    // https://github.com/un-ts/prettier/tree/master/packages/sh
    // https://github.com/un-ts/prettier/tree/master/packages/pkg
];

module.exports = {
    plugins: plugins.map((plugin) => require.resolve(plugin)),

    // official options
    endOfLine: 'auto',
    printWidth: 100,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',

    // plugins options
    jsdocCommentLineStrategy: 'keep',

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

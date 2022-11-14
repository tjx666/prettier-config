module.exports = {
    endOfLine: 'auto',
    printWidth: 100,
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'all',
    plugins: [require.resolve('@prettier/plugin-xml')],
    overrides: [
        {
            files: '*.svg',
            options: {
                parser: 'html',
            },
        },
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.yaml',
            options: {
                tabWidth: 2,
            },
        },
    ],
};

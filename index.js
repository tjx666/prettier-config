function isInstalled(pkg) {
    try {
        require.resolve(pkg);
    } catch {
        return false;
    }
    return true;
}

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

/** @type {import('prettier').Config} */
const prettierConfig = {
    plugins,

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
    jsdocPrintWidth: 120,
    // https://github.com/hosseinmd/prettier-plugin-jsdoc/issues/86#issuecomment-782927935
    tsdoc: true,

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
        {
            files: '*.code-snippets',
            options: {
                parser: 'jsonc',
            },
        },
    ],
};

// https://github.com/withastro/prettier-plugin-astro
const astroPlugin = 'prettier-plugin-astro';
if (isInstalled(astroPlugin)) {
    plugins.push(astroPlugin);
}
prettierConfig.overrides.push({
    files: '*.astro',
    options: {
        parser: 'astro',
    },
});

// at last
// https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
const tailwindcssPlugin = 'prettier-plugin-tailwindcss';
if (isInstalled(tailwindcssPlugin)) {
    plugins.push(tailwindcssPlugin);
}

prettierConfig.plugins = prettierConfig.plugins.map((plugin) => require.resolve(plugin));

module.exports = prettierConfig;

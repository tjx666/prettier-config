import { createRequire } from 'module';

const require = createRequire(import.meta.url);

function resolveOptionalPlugin(packageName) {
    try {
        return require.resolve(packageName);
    } catch {
        return undefined;
    }
}

const tailwindcssPluginName = 'prettier-plugin-tailwindcss';
const resolvedTailwindcssPlugin = resolveOptionalPlugin(tailwindcssPluginName);

const basePlugins = [
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

// https://github.com/withastro/prettier-plugin-astro
const astroPlugin = resolveOptionalPlugin('prettier-plugin-astro');
if (astroPlugin) {
    basePlugins.push(astroPlugin);
}

const resolvedBasePlugins = basePlugins.map((plugin) => require.resolve(plugin));

const baseOverrides = [
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
    {
        files: '*.astro',
        options: {
            parser: 'astro',
        },
    },
];

const baseConfig = {
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
    /** Preserve empty JSDoc comments instead of accepting the plugin's destructive default. */
    jsdocEmptyCommentStrategy: 'keep',
    jsdocPrintWidth: 120,
    // https://github.com/hosseinmd/prettier-plugin-jsdoc/issues/86#issuecomment-782927935
    tsdoc: true,
};

function cloneOverride(override) {
    return {
        ...override,
        ...(override.options && { options: { ...override.options } }),
    };
}

/**
 * Creates an independent Prettier config by appending consumer plugins and overrides to the shared defaults.
 *
 * `prettier-plugin-tailwindcss` is intentionally de-duplicated and appended last because its compatibility layer
 * requires it to be the final plugin.
 *
 * @param {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} [options]
 * @returns {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
 */
export function createPrettierConfig(options = {}) {
    const {
        overrides: consumerOverrides = [],
        plugins: consumerPlugins = [],
        ...consumerOptions
    } = options;
    const plugins = [
        ...resolvedBasePlugins,
        ...consumerPlugins.filter(
            (plugin) => plugin !== tailwindcssPluginName && plugin !== resolvedTailwindcssPlugin,
        ),
    ];

    if (resolvedTailwindcssPlugin) {
        plugins.push(resolvedTailwindcssPlugin);
    }

    return {
        ...baseConfig,
        ...consumerOptions,
        plugins,
        overrides: [...baseOverrides.map(cloneOverride), ...consumerOverrides.map(cloneOverride)],
    };
}

/** @type {import('prettier').Config} */
const prettierConfig = createPrettierConfig();

export default prettierConfig;

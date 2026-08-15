import assert from 'node:assert';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import prettier from 'prettier';

const sourcePath = fileURLToPath(new URL('../index.js', import.meta.url));
const fixtureDirectories = [];

async function addFixturePlugin(fixtureDirectory, packageName) {
    const packageDirectory = path.join(fixtureDirectory, 'node_modules', ...packageName.split('/'));
    await mkdir(packageDirectory, { recursive: true });
    await writeFile(
        path.join(packageDirectory, 'package.json'),
        JSON.stringify({ name: packageName, exports: './index.js', type: 'module' }),
    );
    await writeFile(path.join(packageDirectory, 'index.js'), 'export default {};\n');
}

async function loadFixture({ tailwind = false } = {}) {
    const fixtureDirectory = await mkdtemp(path.join(tmpdir(), 'prettier-config-'));
    fixtureDirectories.push(fixtureDirectory);

    const fixtureConfigPath = path.join(fixtureDirectory, 'index.js');
    await cp(sourcePath, fixtureConfigPath);
    await Promise.all([
        addFixturePlugin(fixtureDirectory, '@prettier/plugin-xml'),
        addFixturePlugin(fixtureDirectory, 'prettier-plugin-jsdoc'),
        ...(tailwind ? [addFixturePlugin(fixtureDirectory, 'prettier-plugin-tailwindcss')] : []),
    ]);

    return import(pathToFileURL(fixtureConfigPath).href);
}

after(async () => {
    await Promise.all(
        fixtureDirectories.map((fixtureDirectory) =>
            rm(fixtureDirectory, { recursive: true, force: true }),
        ),
    );
});

describe('createPrettierConfig', () => {
    it('returns independent configs when the Tailwind plugin is absent', async () => {
        const { createPrettierConfig, default: defaultConfig } = await loadFixture();
        const consumerOverride = {
            files: '*.json',
            options: { parser: 'json' },
        };
        const consumerPlugin = { name: 'consumer-plugin' };
        const consumerOverrides = [consumerOverride];
        const consumerPlugins = [consumerPlugin];

        const firstConfig = createPrettierConfig({
            overrides: consumerOverrides,
            plugins: consumerPlugins,
            semi: false,
        });
        const secondConfig = createPrettierConfig();

        assert.strictEqual(firstConfig.semi, false);
        assert.deepStrictEqual(firstConfig.overrides.at(-1), consumerOverride);
        assert.strictEqual(firstConfig.plugins.at(-1).name, 'consumer-plugin');
        assert.ok(
            firstConfig.plugins.every(
                (plugin) => !String(plugin).includes('prettier-plugin-tailwindcss'),
            ),
        );
        assert.notStrictEqual(firstConfig.plugins, secondConfig.plugins);
        assert.notStrictEqual(firstConfig.overrides, secondConfig.overrides);
        assert.notStrictEqual(firstConfig.plugins, defaultConfig.plugins);
        assert.notStrictEqual(firstConfig.overrides, defaultConfig.overrides);
        assert.notStrictEqual(firstConfig.overrides.at(-1), consumerOverride);

        firstConfig.plugins.push('mutated-plugin');
        firstConfig.overrides[0].options.parser = 'mutated-parser';

        assert.ok(!secondConfig.plugins.includes('mutated-plugin'));
        assert.notStrictEqual(secondConfig.overrides[0].options.parser, 'mutated-parser');
        assert.deepStrictEqual(consumerPlugins, [consumerPlugin]);
        assert.deepStrictEqual(consumerOverrides, [consumerOverride]);
    });

    it('keeps the Tailwind plugin last and forwards Tailwind CSS v4 options', async () => {
        const { createPrettierConfig, default: defaultConfig } = await loadFixture({
            tailwind: true,
        });

        const config = createPrettierConfig({
            plugins: [{ name: 'consumer-plugin' }, 'prettier-plugin-tailwindcss'],
            tailwindFunctions: ['cn', 'cva'],
            tailwindStylesheet: './src/styles/app.css',
        });

        assert.strictEqual(config.plugins.at(-2).name, 'consumer-plugin');
        assert.match(config.plugins.at(-1), /prettier-plugin-tailwindcss/);
        assert.strictEqual(
            config.plugins.filter((plugin) =>
                String(plugin).includes('prettier-plugin-tailwindcss'),
            ).length,
            1,
        );
        assert.match(defaultConfig.plugins.at(-1), /prettier-plugin-tailwindcss/);
        assert.strictEqual(config.tailwindStylesheet, './src/styles/app.css');
        assert.deepStrictEqual(config.tailwindFunctions, ['cn', 'cva']);
    });

    it('supports a Tailwind CSS v4 ESM config fixture', async () => {
        const { default: config } = await import('./fixtures/tailwind-v4/prettier.config.mjs');
        const filepath = fileURLToPath(
            new URL('./fixtures/tailwind-v4/src/example.js', import.meta.url),
        );

        assert.strictEqual(config.tailwindStylesheet, './src/styles/app.css');
        assert.deepStrictEqual(config.tailwindFunctions, ['cn', 'cva']);
        assert.match(config.plugins.at(-1), /prettier-plugin-tailwindcss/);
        assert.strictEqual(
            await prettier.format("const classes = cn('px-2 flex')", {
                ...config,
                filepath,
                parser: 'babel',
            }),
            "const classes = cn('flex px-2');\n",
        );
    });
});

it('declares Tailwind CSS integration as an optional peer dependency', async () => {
    const packageJson = JSON.parse(
        await readFile(new URL('../package.json', import.meta.url), 'utf8'),
    );

    assert.ok(packageJson.peerDependencies['prettier-plugin-tailwindcss']);
    assert.strictEqual(
        packageJson.peerDependenciesMeta['prettier-plugin-tailwindcss'].optional,
        true,
    );
});

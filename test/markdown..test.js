const assert = require('node:assert');
const prettier = require('prettier');
const options = require('../index');

function testFormat(source, result) {
    return () => {
        assert.strictEqual(
            prettier.format(source, {
                ...options,
                parser: 'markdown',
                tabWidth: 2,
            }),
            result,
        );
    };
}

it(
    'tabWidth',
    testFormat(
        `-   list item 1
-   list item 2
-   list item 3`,
        `- list item 1
- list item 2
- list item 3
`,
    ),
);

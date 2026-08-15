import assert from 'node:assert';
import prettier from 'prettier';

import options from '../index.js';

function testFormat(source, result) {
    return async () => {
        assert.strictEqual(
            await prettier.format(source, {
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

// it('autocorrect', testFormat('apple是一家伟大的互联网公司', 'apple 是一家伟大的互联网公司'));

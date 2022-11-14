const assert = require('node:assert');
const prettier = require('prettier');
const options = require('../index');

function testFormat(source, result) {
    return () => {
        assert.strictEqual(
            prettier.format(source, {
                ...options,
                parser: 'babel',
            }),
            result,
        );
    };
}

it('endOfLine', testFormat('6;', '6;\n'));

describe('printWidth', () => {
    const notWrapSource = `const thisIsAVeryVeryVeryLoooooooooooooooooooogVariable = '666666666666666666666666666666666666666'`;
    it('not wrap', testFormat(notWrapSource, notWrapSource + ';\n'));
    it(
        'wrap',
        testFormat(
            `const thisIsAVeryVeryVeryLoooooooooooooooooooogVariable = '6666666666666666666666666666666666666666'`,
            `const thisIsAVeryVeryVeryLoooooooooooooooooooogVariable =
    '6666666666666666666666666666666666666666';
`,
        ),
    );
});

it(
    'quoteProps',
    testFormat(
        `const obj = {
    a: 1,
    'b-c': 2
}`,
        `const obj = {
    'a': 1,
    'b-c': 2,
};
`,
    ),
);

it('semi', testFormat('6', '6;\n'));

it('singleQuote', testFormat(`""`, `'';\n`));

it(
    'tabWidth',
    testFormat(
        `if (true) {
  console.log()
}`,
        `if (true) {
    console.log();
}
`,
    ),
);

it(
    'trailingComma',
    testFormat(
        `const obj = {
    a: 'a',
    b: 'b'
}`,
        `const obj = {
    a: 'a',
    b: 'b',
};
`,
    ),
);

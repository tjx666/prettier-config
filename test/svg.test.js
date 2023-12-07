const assert = require('node:assert');
const prettier = require('prettier');
const options = require('../index');

function testFormat(source, result) {
    return async () => {
        assert.strictEqual(
            await prettier.format(source, {
                ...options,
                parser: 'html',
            }),
            result,
        );
    };
}

it(
    'format svg',
    testFormat(
        `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.2C12.9764 16.2 16.2 12.9764 16.2 9C16.2 5.02355 12.9764 1.8 9 1.8C5.02355 1.8 1.8 5.02355 1.8 9C1.8 12.9764 5.02355 16.2 9 16.2ZM8.1 11.7H9.9V13.5H8.1V11.7ZM8.1 4.5H9.9V10.8H8.1V4.5Z" fill="#E8443A"/>
</svg>`,
        `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM9 16.2C12.9764 16.2 16.2 12.9764 16.2 9C16.2 5.02355 12.9764 1.8 9 1.8C5.02355 1.8 1.8 5.02355 1.8 9C1.8 12.9764 5.02355 16.2 9 16.2ZM8.1 11.7H9.9V13.5H8.1V11.7ZM8.1 4.5H9.9V10.8H8.1V4.5Z"
        fill="#E8443A"
    />
</svg>
`,
    ),
);

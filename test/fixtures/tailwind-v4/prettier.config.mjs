import { createPrettierConfig } from '../../../index.js';

export default createPrettierConfig({
    tailwindFunctions: ['cn', 'cva'],
    tailwindStylesheet: './src/styles/app.css',
});

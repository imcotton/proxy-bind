import pkg from './package.json';





export default {

    input: './lib/index.ts',

    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'esm',
        },
    ],

    plugins: [

        require('rollup-plugin-typescript')({
            typescript: require('typescript'),
        }),

    ],

};


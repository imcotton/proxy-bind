import pkg from './package.json';





const dist = (file = '') => `${ process.env.OUT || './dist' }/${ file }`;



export default {

    input: dist(pkg.main),

    output: [
        {
            file: dist(pkg.main),
            format: 'cjs',
        },
        {
            file: dist(pkg.module),
            format: 'esm',
        },
    ],

};


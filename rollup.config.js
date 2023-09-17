import babel from 'rollup-plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import peerDeps from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import image from 'rollup-plugin-image'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            },
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
            }),
            peerDeps(),
            nodeResolve(),
            postcss({
                plugins: [],
                minimize: true,
            }),
            terser(),
            image(),
        ],
    },
]

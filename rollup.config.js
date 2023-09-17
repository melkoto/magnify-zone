import babel from 'rollup-plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import peerDeps from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import image from 'rollup-plugin-image'
import typescript from '@rollup/plugin-typescript'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDeps(),
            nodeResolve(),
            typescript(),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
            }),
            postcss({
                plugins: [],
                minimize: true,
            }),
            terser(),
            image(),
        ],
    },
]

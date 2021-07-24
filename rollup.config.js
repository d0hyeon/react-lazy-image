import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss'
import css from "rollup-plugin-import-css";
import pkg from './package.json';


export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      compact: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      compact: true,
    },
  ],
  plugins: [
    css(),
    babel({ babelHelpers: 'bundled' }),
    resolve(),
    commonjs(),
    terser(),
    typescript(),
  ],
  exclude: ['node_modules', 'dist']
};

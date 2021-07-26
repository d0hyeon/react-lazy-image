import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from "rollup-plugin-terser";
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
    babel({ babelHelpers: 'bundled' }),
    resolve(),
    commonjs(),
    terser(),
    typescript({
      tsconfig: './tsconfig.json'
    }),
    external(),
  ],

};

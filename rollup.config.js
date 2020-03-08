import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import less from 'rollup-plugin-less';
import commonjs from '@rollup/plugin-commonjs';

module.exports = [{
  input: 'src/index.ts',
  output: {
    file: 'dist/clz.min.js',
    name: 'CLZ',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    less({
      insert: true,
      output: false,
    }),
    uglify(),
  ],
}];

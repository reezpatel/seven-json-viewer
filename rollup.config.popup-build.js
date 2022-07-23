import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import html2 from 'rollup-plugin-html2';

export default {
  input: 'src/bundle/popup.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'dist/package/popup.js'
  },
  plugins: [
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        scss: {
          includePaths: ['src']
        }
      })
    }),
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({ sourceMap: false }),
    terser(),
    html2({
      template: 'src/page/popup.html'
    })
  ]
};

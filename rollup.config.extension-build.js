import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/bundle/main.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "dist/package/main.js",
  },
  plugins: [
    svelte({
      emitCss: false,
      preprocess: sveltePreprocess({
        scss: {
          includePaths: ["src"],
        },
      }),
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({ sourceMap: false }),
    terser(),
  ],
};

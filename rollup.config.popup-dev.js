import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import html2 from "rollup-plugin-html2";

export default {
  input: "src/page/popup.ts",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "dist/popup/bundle.js",
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
    html2({
      template: "src/page/index.html",
    }),
    serve({
      contentBase: "dist/popup",

      open: true,
      port: "4456",
    }),
    livereload({ watch: "dist/popup" }),
  ],
  watch: {
    clearScreen: false,
  },
};

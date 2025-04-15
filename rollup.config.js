import { terser } from "rollup-plugin-terser";

export default {
  input: "script.js", // Entry file
  output: {
    file: "bundle.js", // Output file
    format: "iife", // Immediately Invoked Function Expression for browser compatibility
    sourcemap: true
  },
  plugins: [terser()] // Minify the output
};

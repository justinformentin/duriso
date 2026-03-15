import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const input = "lib/index.js";

const commonPlugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
];

const outputs = (format) => {
  const extensions = {
    cjs: '.cjs',
    esm: '.js',
    umd: '.umd.js'
  };
  return {
    format,
    file: `dist/index${extensions[format]}`,
  };
};

const defaultBabel = () =>
  babel({
    exclude: "node_modules/**",
    babelHelpers: "bundled",
  });

export default [
  {
    input,
    output: {
      name: "duriso",
      ...outputs("umd"),
      exports: "named",
    },
    plugins: [...commonPlugins, defaultBabel(), terser()],
  },
  {
    input,
    output: outputs("cjs"),
    plugins: [...commonPlugins, defaultBabel(), terser()],
  },
  {
    input,
    output: outputs("esm"),
    plugins: [...commonPlugins, terser()],
  },
];

export default function (p1, p2) {
  return {
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-runtime"],
  };
}

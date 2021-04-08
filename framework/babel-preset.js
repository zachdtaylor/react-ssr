module.exports = function (p1, p2) {
  return {
    presets: [["@babel/preset-env"], "@babel/preset-react"],
    plugins: ["@babel/plugin-transform-runtime"],
  };
};

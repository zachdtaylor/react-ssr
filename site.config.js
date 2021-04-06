import path from "path";

function getRoutes({ location }) {}

const config = {
  routes: getRoutes({ location: path.resolve("./src/pages") }),
};

export default config;

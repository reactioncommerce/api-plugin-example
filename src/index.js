import pkg from "../package.json";
import i18n from "./i18n/index.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
export default async function register(app) {
  await app.registerPlugin({
    label: "Dashboard-stats",
    name: "Dashboard-stats",
    version: pkg.version,
    i18n,
    graphQL: {
      resolvers,
      schemas,
    },
  });
}

import pkg from "../package.json";
import startup from "./startup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Mailcimp Marketing",
    name: "mailchimp-marketing",
    version: pkg.version,
    functionsByType: {
      startup: [startup]
    }
  });
}

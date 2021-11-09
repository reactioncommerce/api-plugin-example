/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import config from "./config.js";
import { Products } from "./data/index.js";

/**
 * @summary Called on startup
 * @param {Object} context Startup context
 * @param {Object} context.collections Map of MongoDB collections
 * @returns {undefined}
 */
export default async function startup(context) {
  console.log("In start up for Mailchimp marketing");
  const { app } = context;
  const { expressApp } = app;
  const products = await Products(context);
  console.log("All products =========", products.totalCount);
  registerCallback(expressApp);
  startAuth();
}

/**
 * Initiates authentication with Mailchimp server.
 * @returns {HTML} Redirects to Mailchimp login.
 */
function startAuth() {
  const redirectURI = `${config.BASE_URL}/oauth/mailchimp/callback`;
  const url = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${config.MAILCHIMP_CLIENT_ID}&redirect_url=${redirectURI}`;
  axios.get(url)
    .then((res) => {
      console.log("This is the success promise response");
      return res;
    })
    .catch((error) => console.log("Error with initiating auth\n", error));
}

/**
 * Adds two numbers together.
 * @param {object} expressApp Express instance.
 * @returns {int} The value of code.
 */
function registerCallback(expressApp) {
  expressApp.get("/oauth/mailchimp/callback", (req, res) => {
    console.log("Callback successful**************");
    const {
      query: { code }
    } = req;
    console.log("Auth code ===============", code);
  });
}

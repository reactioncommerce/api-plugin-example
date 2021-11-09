import envalid from "envalid";

const { str } = envalid;

export default envalid.cleanEnv(process.env, {
  NODE_ENV: str({ default: "production" }),
  MAILCHIMP_CLIENT_ID: str({ devDefault: "" }),
  MAILCHIMP_CLIENT_SECRET: str({ devDefault: "" }),
  BASE_URL: str({ devDefault: "http://127.0.0.1:4080" })
}, {
  dotEnvPath: null
});

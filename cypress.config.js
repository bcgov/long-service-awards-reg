import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config();

const appURL = process.env.LSA_REGISTRATION_APP_URL;

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    url: appURL,
  },
  video: false,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 0,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
});

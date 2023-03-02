import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import {fileURLToPath, URL} from "url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to 'LSA_APPS_' to load all LSA web app env.
  const env = loadEnv(mode, process.cwd(), 'LSA_APPS_');
  console.log('ENV Vars:', env)

  // const htmlPlugin = () => {
  //   return {
  //     name: "html-transform",
  //     transformIndexHtml(html) {
  //       return html.replace(/%(.*?)%/g, function (match) {
  //         return env[match.slice(1, -1)];
  //       });
  //     },
  //   };
  // };

  return {
    envPrefix: 'LSA_APPS_',
    base: env.LSA_APPS_ADMIN_BASE,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [react()],
  };
});

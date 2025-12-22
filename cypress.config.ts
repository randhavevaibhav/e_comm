import "dotenv/config";
import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoOptions = {
  development: false,
  production: false,
  test: false,
};

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_CLIENT_URL,
    video: videoOptions[process.env.NODE_ENV],
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              //these import alias required when cypress actually runs
              // and the alias in cypress/tsconfig.json are required by typescript in compile time
              "@utils": path.resolve(__dirname, "cypress/e2e/utils"),
              "@Cypress": path.resolve(__dirname, "cypress/"),
              "@": path.resolve(__dirname, "src/"),
            },
            extensions: [".js", ".jsx", ".ts", ".tsx"], // Add extensions for your files
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: "ts-loader",
                    options: {
                      // Speed up compilation by skipping type checking (Cypress handles this)
                      transpileOnly: true,
                    },
                  },
                ],
              },
            ],
          },
        },
      };
      on("file:preprocessor", webpackPreprocessor(options));
    },
    env: {
      userEmail: process.env.CYPRESS_USER_EMAIL,
      password: process.env.CYPRESS_USER_PASSWORD,
    },
  },
});

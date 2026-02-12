import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    // REQUIRED for GitHub Pages project site:
    // https://qsama95.github.io/google-gemini-gesture/
    base: "/google-gemini-gesture/",

    plugins: [react()],

    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});

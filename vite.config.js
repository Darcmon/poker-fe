import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
      "/ws": {
        target: "ws://localhost:8000",
      },
    },
  },
  plugins: [reactRefresh()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        game: resolve(__dirname, "game/index.html"),
      },
    },
  },
});

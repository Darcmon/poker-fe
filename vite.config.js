import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

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
  plugins: [reactRefresh({ exclude: "src/Game.jsx" })],
});

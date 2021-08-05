export default {
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
};

import type { Plugin } from "vite";

const crossOriginIsolation: () => Plugin = () => ({
  name: 'isolation',

  configureServer(server) {
    server.middlewares.use((_req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");

      next();
    });
  }
});

export default crossOriginIsolation

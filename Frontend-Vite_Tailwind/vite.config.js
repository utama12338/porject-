import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from 'dotenv';
config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  ssr: {
    noExternal: ['https'],
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src"}],
  },
  //change port for production
  preview: {
    port: 8080,
    headers: {
      'Strict-Transport-Security': "max-age=43200",
      'X-Content-Type-Options': "nosniff",
      'X-Frame-Options': "sameorigin",
      'X-XSS-Protection': "1; mode=block",
      // 'Content-Security-Policy': ["'self'", "https: 'unsafe-inline'"],
    },
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
        next();
      });
    },
  },
// for dev
  server: {
    port: 8080,
    headers: {
      'Strict-Transport-Security': "max-age=43200",
      'X-Content-Type-Options': "nosniff",
      'X-Frame-Options': "sameorigin",
      'X-XSS-Protection': "1; mode=block",
    },
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
        next();
      });
    },
  },
});

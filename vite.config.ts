
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Add process.env shim for packages that depend on it
    'process.env': {
      NODE_ENV: JSON.stringify(mode),
    },
    // Add global process for notion-client
    'global': {},
  },
  build: {
    rollupOptions: {
      // Make sure Vercel packages don't get bundled/optimized out
      external: [],
    },
  },
  optimizeDeps: {
    // Exclude Node.js specific modules that cause browser compatibility issues
    exclude: ['dns', 'fs', 'net', 'tls', 'child_process'],
  },
}));

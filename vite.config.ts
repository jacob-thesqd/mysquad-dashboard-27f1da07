
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
    // Add this to provide the process.env object
    'process.env': {},
    // Fix for "process is not defined" error in notion-client
    'process': { 
      env: {}, 
      browser: true
    },
  },
  build: {
    // This helps with Vercel analytics integration
    rollupOptions: {
      // Make sure Vercel packages don't get bundled/optimized out
      external: [],
    },
  },
}));

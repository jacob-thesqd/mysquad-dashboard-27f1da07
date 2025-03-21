
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
      // Add other environment variables as needed
      REACT_APP_NOTION_API_BASE_URL: undefined,
      REACT_APP_NOTION_TOKEN: undefined,
      REACT_APP_NOTION_ACTIVE_USER: undefined,
      REACT_APP_NOTION_USER_TIMEZONE: undefined
    },
    // Add global process for notion-client with more complete shims
    'global': {},
    'process': {
      'browser': true,
      'env': {
        NODE_ENV: JSON.stringify(mode),
        REACT_APP_NOTION_API_BASE_URL: undefined,
        REACT_APP_NOTION_TOKEN: undefined,
        REACT_APP_NOTION_ACTIVE_USER: undefined,
        REACT_APP_NOTION_USER_TIMEZONE: undefined
      },
      'nextTick': (callback: Function, ...args: any[]) => setTimeout(() => callback(...args), 0),
      'version': '',
      'versions': { node: '16.0.0' },
      'platform': 'browser'
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

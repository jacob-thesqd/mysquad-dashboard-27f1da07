import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { inject } from '@vercel/analytics';

inject({
    mode: 'production', // Use 'development' for testing locally
    debug: true, // Set to false in production
    beforeSend: (event) => {
      // Optional: modify or filter events before they're sent
      return event;
    },
  });

// Add error handling for the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <>
    <Analytics debug={true} />
    <App />
  </>
);
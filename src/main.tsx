
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './styles/notion.css'; // Add this import for Notion styles
import { inject } from '@vercel/analytics';

inject({
    mode: 'production', // Use 'production' mode to ensure analytics are sent
    debug: true, // You can set this to false in production
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
    <App />
  </>
);

import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Analytics } from '@vercel/analytics/react';

// Add error handling for the root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <>
    <Analytics debug={true} />
    <App />
  </>
);
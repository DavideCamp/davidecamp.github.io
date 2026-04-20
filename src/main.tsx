import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SmoothScrollProvider } from './components/n8n/SmoothScrollProvider';

createRoot(document.getElementById('root')!).render(
  <SmoothScrollProvider>
    <App />
  </SmoothScrollProvider>,
);

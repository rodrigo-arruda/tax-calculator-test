import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // Use createRoot to initialize the app

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

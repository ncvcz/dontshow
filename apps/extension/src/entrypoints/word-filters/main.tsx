import React from 'react';
import { createRoot } from 'react-dom/client';
import Page from './page';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);

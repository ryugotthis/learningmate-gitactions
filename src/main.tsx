// import React from 'react';
import ReactDOM from 'react-dom/client';
import { TanStackQueryProvider } from './app/providers/TanstackQueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';
import { HelmetProvider } from 'react-helmet-async'; // seo 개선 위해 사용
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <HelmetProvider>
    <TanStackQueryProvider>
      <RouterProvider />
    </TanStackQueryProvider>
  </HelmetProvider>
  // </React.StrictMode>
);

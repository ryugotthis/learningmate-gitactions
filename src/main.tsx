import React from 'react';
import ReactDOM from 'react-dom/client';
import { TanStackQueryProvider } from './app/providers/TanstackQueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TanStackQueryProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider />
      </ThemeProvider>
    </TanStackQueryProvider>
  </React.StrictMode>
);

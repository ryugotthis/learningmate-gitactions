// import React from 'react';
import ReactDOM from 'react-dom/client';
import { TanStackQueryProvider } from './app/providers/TanstackQueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';
import { HelmetProvider } from 'react-helmet-async'; // // 페이지별 메타태그 관리 (SPA SEO 개선)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  // HelmetProvider: 페이지별 title, description 등 Meta 관리 전역 컨텍스트
  <HelmetProvider>

    {/* 전역 React Query Provider (데이터 캐싱 / 서버 상태 관리) */}
    <TanStackQueryProvider>

      {/* 라우터 전역 Provider - 모든 페이지 이동 처리 */}
      <RouterProvider />
    </TanStackQueryProvider>
  </HelmetProvider>
  // </React.StrictMode>
);

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // 개발 서버에서만 HTTPS 설정 적용
  const serverConfig =
    command === 'serve'
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
          },
          host: 'localhost',
          port: 4000,
        }
      : {};

  return {
    plugins: [react()],
    server: serverConfig,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 🔹 공통 라이브러리들을 분리해서 캐싱 활용
            react: ['react', 'react-dom'],
            vendor: [
              'react-router-dom',
              '@tanstack/react-query',
              'zustand',
              'react-hook-form',
              // 여기에 자주 쓰는 라이브러리 추가 가능
            ],
          },
        },
      },
    },
  };
});

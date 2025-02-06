import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')), // 경로 수정
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')), // 경로 수정생성한 인증서 파일
    },
    host: 'localhost', // 로컬에서 실행
    // 로컬 포트 4000번
    port: 4000,
  },
});

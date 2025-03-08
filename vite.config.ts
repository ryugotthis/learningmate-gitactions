import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
// import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// svg파일을 ReactComponent로 처리하도록 설정
// import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  //개발 서버를 실행할때만 적용됨
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

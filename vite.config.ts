import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
// import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// svg파일을 ReactComponent로 처리하도록 설정
// import svgr from 'vite-plugin-svgr';

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
  };
});

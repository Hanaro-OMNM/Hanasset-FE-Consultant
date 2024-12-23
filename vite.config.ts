import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['swiper/react', 'swiper'],
  },
  define: {
    global: 'window', // Node.js global 객체를 window로 대체
  },
  server: {
    host: '0.0.0.0', // 네트워크 접근 허용
    proxy: {
      '/api': {
        target: 'https://naveropenapi.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws-chat': {
        target: 'http://localhost:8080', // 백엔드 서버
        ws: true, // WebSocket 지원
        changeOrigin: true,
      },
    },
    port: 3000,
  },
});

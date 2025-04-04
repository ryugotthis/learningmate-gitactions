import axios from 'axios';
import { useAuthStore } from '../store/authstore';

export const authApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 요청 인터셉터 추가 (accessToken 자동 추가)
authApiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

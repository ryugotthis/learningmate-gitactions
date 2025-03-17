import axios from 'axios';
import { useAuthStore } from '../store/authstore';

export const authApiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', //API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 요청 인터셉터 추가 (accessToken 자동 추가)
authApiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기
  console.log('토큰', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

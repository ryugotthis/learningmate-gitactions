import axios from 'axios';
import { useAuthStore } from '../store/authstore';
import { reissue } from '../../entities/auth/api/reissue';

export const authApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
    timeout: 3000, // 3초 타임아웃 설정
});

// 요청 인터셉터 추가 (accessToken 자동 추가)
authApiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 (401/403 에러 처리 + 토큰 재발급)
authApiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await reissue();
        useAuthStore.getState().setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authApiClient(originalRequest);
      } catch (reissueError) {
        useAuthStore.getState().clearAccessToken();
        useAuthStore.getState().setIsLoggedIn(false);
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }

    if (error.response?.status === 403) {
      alert('접근 권한이 없습니다.');
      // 필요하면 다른 페이지로 이동도 가능
      // window.location.href = '/unauthorized';
    }

    return Promise.reject(error);
  }
);

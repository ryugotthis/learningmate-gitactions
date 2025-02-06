import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../../../shared/model/store';

// export const apiClient3 = axios.create({
//   baseURL: 'http://15.164.2.37/api/v1', // API 기본 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키를 포함한 요청 허용
// });

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 요청 인터셉터 설정
// apiClient3.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState(); // Zustand의 getState로 accessToken 가져오기
//   if (accessToken) {
//     console.log('토큰확인', accessToken);
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// 로그아웃 함수
export const logout = async (): Promise<any> => {
  try {
    console.log('로그아웃 요청 URL:', `${apiClient.defaults.baseURL}/logout`);
    await apiClient.post('/logout'); // 서버에 로그아웃 요청
  } catch (error) {
    console.error('로그아웃 실패1:', error);
    // 에러가 AxiosError인지 확인 후 요청 URL 출력
    if (axios.isAxiosError(error)) {
      console.log(
        '요청 URL:',
        error.config?.url || 'URL 정보를 가져올 수 없습니다.'
      );
    } else {
      console.log('AxiosError가 아닌 에러 발생');
    }
    console.log('로그아웃 실패 URL:', `${apiClient.defaults.baseURL}/logout`);
    throw error;
  }
};

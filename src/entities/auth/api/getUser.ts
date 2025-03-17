// import axios from 'axios';
// import { useAuthStore } from '../../../shared/store/authstore';
// import { authApiClient } from '../../../shared/api/authApiClient';

// export const apiClient = axios.create({
//   baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키를 포함한 요청 허용
// });

// // ✅ 요청 인터셉터 추가 (accessToken 자동 추가)
// apiClient.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });
import { authApiClient } from '../../../shared/api/authApiClient';
export const getUser = async (): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${authApiClient.defaults.baseURL}/users/my`);
  const response = await authApiClient.get('/users/my');

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data;
};

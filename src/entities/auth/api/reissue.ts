// 엑세스 토큰 갱신 API 호출
// import { apiClient } from '../../../shared/api/axios';

// export const reissue = async () => {
//   try {
//     const response = await apiClient.post('/re-issue'); // 백엔드 엔드포인트
//     return response.data; // 새 accessToken 반환
//   } catch (error) {
//     console.log('refreshToken 실패1:', error);
//     throw error;
//   }
// };

import axios from 'axios';
import { useAuthStore } from '../../../shared/model/store';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// const getCookie = (name: string) => {
//   const cookies = document.cookie.split(';');
//   for (let cookie of cookies) {
//     const [key, value] = cookie.trim().split('=');
//     if (key === name) {
//       return value;
//     }
//   }
//   return null;
// };

export const reissue = async () => {
  // const refreshToken = getCookie('refresh');
  // const { accessToken } = useAuthStore.getState();
  try {
    const response = await apiClient.post(
      '/re-issue', // 백엔드 엔드포인트
      null, // POST 요청에 body 데이터가 없는 경우 null
      {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`, // 필요한 경우 Access Token 추가
        //   // Cookie: `refresh=${refreshToken}`, // Refresh 토큰을 헤더에 추가
        // },
        withCredentials: true, // 쿠키 포함 요청 활성화
      }
    );
    return response.data; // 새 accessToken 반환
  } catch (error) {
    console.log('refreshToken 실패1:', error);
    throw error;
  }
};

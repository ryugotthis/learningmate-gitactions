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

// const geokies = document.cookie.split(';');
//   for (let cookie of cookies) {
//     const [key, value] = cookie.trim().split('=');
//     if (key === name) {
//       return value;
//     }
//   }
//   return null;
// };

import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

export const reissue = async () => {
  try {
    const response = await apiClient.post(
      '/re-issue', // 백엔드 엔드포인트
      null, // POST 요청에 body 데이터가 없는 경우 null
      {
        withCredentials: true, // 쿠키 포함 요청 활성화
      }
    );
    console.log('🔄 reissue 응답:', response.data.data);
    return response.data.data; // 새 accessToken 반환
  } catch (error) {
    const axiosError = error as AxiosError; // ✅ `error`를 `AxiosError`로 변환
    console.log(
      '🚨 refreshToken 실패:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError; // ✅ 변환된 에러를 다시 throw
  }
};

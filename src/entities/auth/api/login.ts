// 로그인 api 호출
// import { apiClient } from '../../../shared/api/axios';

// Axios 기본 설정
// import axios from 'axios';

// export const apiClient = axios.create({
//   baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키를 포함한 요청 허용
// });
import { authApiClient } from '../../../shared/api/authApiClient';
export interface LoginPayload {
  email: string; // 사용자 ID
  password: string; // 비밀번호
}

// 로그인 API의 응답 타입 정의
// export interface LoginResponse {
//   accessToken: string; // 서버에서 발급된 JWT Access Token
// }

// 개발중이라 로그인 API 호출 함수 응답데이터 타입 any로 대체
export const login = async (data: LoginPayload): Promise<any> => {
  // 가상의 API URL을 사용하여 POST 요청
  try {
    console.log('로그인데이터', data);

    const response = await authApiClient.post('/login', data);

    // 서버로부터 받은 데이터 반환
    return response.data;
  } catch (error) {
    console.log('로그인실패1:', error);
    throw error;
  }
};

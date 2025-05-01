import { authApiClient } from '../../../shared/api/authApiClient';
export interface LoginPayload {
  email: string; // 사용자 ID
  password: string; // 비밀번호
}

// 로그인 API의 응답 타입 정의
// export interface LoginResponse {
//   accessToken: string; // 서버에서 발급된 JWT Access Token
// }

export const login = async (data: LoginPayload): Promise<any> => {
  // 가상의 API URL을 사용하여 POST 요청
  try {
    const response = await authApiClient.post('/login', data);

    // 서버로부터 받은 데이터 반환
    return response.data;
  } catch (error) {
    console.log('로그인실패1:', error);
    throw error;
  }
};

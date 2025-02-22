import { apiClient } from '../../../shared/api/axios';

// 회원가입 요청에 필요한 데이터 타입 정의
// export interface SignupPayload {
//   userid: string; // 사용자 ID
//   username: string; // 사용자 이름
//   password: string; // 비밀번호
//   age: number; // 나이
// }

export interface SignupPayload {
  name: string; // 사용자 닉네임
  email: string; // 사용자 ID
  // username: string; // 사용자 이름
  password: string; // 비밀번호
  // age: number; // 나이
}

// 회원가입 API 호출 함수
export const signup = async (data: SignupPayload): Promise<any> => {
  // 가상의 API URL을 사용하여 POST 요청
  try {
    console.log('회원가입 데이터', data);
    const response = await apiClient.post('/join', data);

    // 서버로부터 받은 데이터 반환
    return response.data;
  } catch (error) {
    console.log('회원가입 실패1:', error);
    throw error;
  }
};

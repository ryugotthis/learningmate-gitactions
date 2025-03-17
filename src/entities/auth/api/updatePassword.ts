import { authApiClient } from '../../../shared/api/authApiClient';

// export const apiClient = axios.create({
//   baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키를 포함한 요청 허용
// });
// apiClient.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기
//   console.log('토큰', accessToken);
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// 비밀번호 변경 API의 응답 타입 정의
export interface newPassword {
  password: string; // 서버에서 발급된 JWT Access Token
}

// 개발중이라 로그인 API 호출 함수 응답데이터 타입 any로 대체
export const updatePassword = async (data: newPassword): Promise<any> => {
  // 가상의 API URL을 사용하여 POST 요청
  try {
    console.log('비밀번호 변경데이터', data);

    const response = await authApiClient.patch('/users/my/password', data);

    // 서버로부터 받은 데이터 반환
    return response.data;
  } catch (error) {
    console.log('비밀번호 변경1:', error);
    throw error;
  }
};

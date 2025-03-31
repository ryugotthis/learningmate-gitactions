import { AxiosError } from 'axios';
import { apiClient } from '../../../shared/api/apiClient';

export const reissue = async () => {
  try {
    const response = await apiClient.post(
      '/re-issue', // 백엔드 엔드포인트
      null, // POST 요청에 body 데이터가 없는 경우 null
      {
        withCredentials: true, // 쿠키 포함 요청 활성화
      }
    );
    return response.data.data; // 새 accessToken 반환
  } catch (error) {
    const axiosError = error as AxiosError; // ✅ `error`를 `AxiosError`로 변환
    console.log(
      '🚨 refreshToken 실패1:',
      axiosError.response?.data || axiosError.message
    );
    throw axiosError; // ✅ 변환된 에러를 다시 throw
  }
};

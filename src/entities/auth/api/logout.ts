import axios from 'axios';
import { apiClient } from '../../../shared/api/apiClient';

// 로그아웃 함수
export const logout = async (): Promise<any> => {
  try {
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

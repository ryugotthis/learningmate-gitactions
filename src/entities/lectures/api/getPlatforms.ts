import { apiClient } from '../../../shared/api/apiClient';

export const getPlatforms = async (): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get('/platforms');
  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력
  return response.data.data; // ✅ 올바르게 `data`만 반환
};

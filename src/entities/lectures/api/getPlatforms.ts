import { apiClient } from '../../../shared/api/apiClient';

export const getPlatforms = async (): Promise<any> => {
  const response = await apiClient.get('/platforms');

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

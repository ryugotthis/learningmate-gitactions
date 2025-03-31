import { apiClient } from '../../../shared/api/apiClient';

export const getDemandLectureDetailItem = async (
  postId: number
): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get(`/demand-lectures/${postId}`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

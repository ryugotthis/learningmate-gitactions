import { apiClient } from '../../../shared/api/apiClient';

export const getDemandLectureComments = async (
  postId: number
): Promise<any> => {
  const response = await apiClient.get(`/posts/${postId}/comments`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

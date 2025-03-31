import { apiClient } from '../../../shared/api/apiClient';

export const getLectureDetail = async (lectureId: number): Promise<any> => {
  const response = await apiClient.get(`/lectures/${lectureId}`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

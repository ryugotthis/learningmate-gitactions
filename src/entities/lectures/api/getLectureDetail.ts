import { apiClient } from '../../../shared/api/apiClient';

export const getLectureDetail = async (lectureId: number): Promise<any> => {
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);
  const response = await apiClient.get(`/lectures/${lectureId}`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

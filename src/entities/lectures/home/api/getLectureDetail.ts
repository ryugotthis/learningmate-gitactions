import { apiClient } from '../../../../shared/api/apiClient';

export const getLectureDetail = async (lectureId: number): Promise<any> => {
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);
  const response = await apiClient.get(`/lectures/${lectureId}`);

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

import { apiClient } from '../../../shared/api/apiClient';

export const getLecturesTitle = async (
  title: string,
  platform?: string
): Promise<any> => {
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);
  const response = await apiClient.get(
    `/lectures/titles?` +
      `${title ? `title=${title}` : ''}` +
      `${platform !== '전체' ? `&platform=${platform}` : ''}`
    // `&platform=패스트캠퍼스`
  );

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

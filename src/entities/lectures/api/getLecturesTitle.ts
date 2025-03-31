import { apiClient } from '../../../shared/api/apiClient';

export const getLecturesTitle = async (
  title: string,
  platform?: string
): Promise<any> => {
  const response = await apiClient.get(
    `/lectures/titles?` +
      `${title ? `title=${title}` : ''}` +
      `${platform !== '전체' ? `&platform=${platform}` : ''}`
  );

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

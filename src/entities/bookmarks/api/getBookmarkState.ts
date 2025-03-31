import { authApiClient } from '../../../shared/api/authApiClient';

export const getBookmarkState = async (postId: number): Promise<any> => {
  const response = await authApiClient.get(`/bookmarks/exist?postId=${postId}`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

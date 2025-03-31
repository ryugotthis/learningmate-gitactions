// fetchPostLikeStatus:

import { authApiClient } from '../../../shared/api/authApiClient';

export const getPostLikeStatus = async (postId: number): Promise<any> => {
  const response = await authApiClient.get(`/posts/${postId}/like/exists`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

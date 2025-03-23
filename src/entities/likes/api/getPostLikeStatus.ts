// fetchPostLikeStatus:

import { authApiClient } from '../../../shared/api/authApiClient';

export const getPostLikeStatus = async (postId: number): Promise<any> => {
  console.log(
    '플랫폼 요청 URL:',
    `${authApiClient.defaults.baseURL}/posts/${postId}/like/exists`
  );
  const response = await authApiClient.get(`/posts/${postId}/like/exists`);

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

import { authApiClient } from '../../../shared/api/authApiClient';

export const deleteLikes = async (postId: number): Promise<any> => {
  try {
    const response = await authApiClient.delete(`/posts/${postId}/unlike`);
    return response.data;
  } catch (error) {
    console.error('📌 날강도 게시글 추천 실패1:', error);
    throw error;
  }
};

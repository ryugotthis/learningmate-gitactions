import { authApiClient } from '../../../shared/api/authApiClient';

export const deleteLikes = async (postId: number): Promise<any> => {
  try {
    console.log('포스트날강도추천데이터');
    const response = await authApiClient.delete(`/posts/${postId}/unlike`);
    return response.data;
  } catch (error) {
    console.error('📌 포스트날강도 추천 실패1:', error);
    throw error;
  }
};

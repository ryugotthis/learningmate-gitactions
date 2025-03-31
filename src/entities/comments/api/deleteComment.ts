import { authApiClient } from '../../../shared/api/authApiClient';

export const deleteComment = async (postId: number): Promise<any> => {
  try {
    const response = await authApiClient.delete(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.error('📌 댓글삭제 실패1:', error);
    throw error;
  }
};

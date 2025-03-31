import { authApiClient } from '../../../shared/api/authApiClient';

export const deleteLecturesForMe = async (postId: number): Promise<any> => {
  try {
    const response = await authApiClient.delete(`/demand-lectures/${postId}`);
    return response.data;
  } catch (error) {
    console.error('📌 날강도 게시글 삭제 실패1:', error);
    throw error;
  }
};

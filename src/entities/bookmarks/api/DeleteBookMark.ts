import { authApiClient } from '../../../shared/api/authApiClient';

export interface BookMarkData {
  postId: number;
}

export const deleteBookMark = async (postId: number): Promise<any> => {
  try {
    const response = await authApiClient.delete(`/bookmarks?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error('📌 북마크 삭제 실패1:', error);
    throw error;
  }
};

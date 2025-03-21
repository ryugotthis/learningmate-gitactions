import { authApiClient } from '../../../shared/api/authApiClient';
export interface BookMarkData {
  postId: number;
}

export const createBookMark = async (data: BookMarkData): Promise<any> => {
  try {
    const response = await authApiClient.post(`/bookmarks`, data);
    return response.data;
  } catch (error) {
    console.error('📌북마크 추가 실패1:', error);
    throw error;
  }
};

import { authApiClient } from '../../../shared/api/authApiClient';

export interface DemandLectureData {
  title: string; // 제목
  content: string; // 내용
}

export const createLikes = async (postId: number): Promise<any> => {
  try {
    const response = await authApiClient.post(`/posts/${postId}/like`, null);
    return response.data;
  } catch (error) {
    console.error('📌 날강도 게시글 추천 실패1:', error);
    throw error;
  }
};

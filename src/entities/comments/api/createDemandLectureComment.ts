import { authApiClient } from '../../../shared/api/authApiClient';

export interface DemandLectureCommentData {
  content: string; // 내용
}

export const createDemandLectureComment = async (
  postId: number,
  data: DemandLectureCommentData
): Promise<any> => {
  try {
    const response = await authApiClient.post(
      `/posts/${postId}/comments`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('📌 포스트demandLecture 실패1:', error);
    throw error;
  }
};

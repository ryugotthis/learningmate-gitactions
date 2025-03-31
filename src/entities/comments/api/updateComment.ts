import { authApiClient } from '../../../shared/api/authApiClient';

export interface DemandLectureData {
  content: string; // 내용
}

export const updateComment = async (
  commentId: number,
  data: DemandLectureData
): Promise<any> => {
  try {
    const response = await authApiClient.put(`/comments/${commentId}`, data);

    return response.data;
  } catch (error) {
    console.error('📌 수정 댓글 실패1:', error);
    throw error;
  }
};

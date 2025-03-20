import { authApiClient } from '../../../../shared/api/authApiClient';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}

export const createUpVoteOpinion = async ({
  postId,
  data,
}: {
  postId: number;
  data: OpinionData;
}): Promise<any> => {
  try {
    console.log('추천의견추가 post데이터', data);
    const response = await authApiClient.post(
      `/posts/${postId}/up-votes`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('📌추천의견추가 post 실패1:', error);
    throw error;
  }
};

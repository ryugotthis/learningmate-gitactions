import { authApiClient } from '../../../../../shared/api/authApiClient';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}

export const updateUpVoteOpinion = async ({
  opinionId,
  data,
}: {
  opinionId: number;
  data: OpinionData;
}): Promise<any> => {
  try {
    console.log('추천글 수정', data);
    const response = await authApiClient.put(`/up-votes/${opinionId}`, data);
    return response.data;
  } catch (error) {
    console.error('📌추천글 수정1:', error);
    throw error;
  }
};

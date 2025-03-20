import { authApiClient } from '../../../../shared/api/authApiClient';

export const deleteDownVoteOpinion = async (
  opinionId: number
): Promise<any> => {
  try {
    console.log('추천글 삭제');
    const response = await authApiClient.delete(`/down-votes/${opinionId}`);
    return response.data;
  } catch (error) {
    console.error('📌 추천글 삭제1:', error);
    throw error;
  }
};

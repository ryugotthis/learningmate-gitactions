import { authApiClient } from '../../../../shared/api/authApiClient';

export const deleteUpVoteOpinion = async (opinionId: number): Promise<any> => {
  try {
    console.log('추천글 삭제');
    const response = await authApiClient.delete(`/up-votes/${opinionId}`);
    return response.data;
  } catch (error) {
    console.error('📌 추천글 삭제1:', error);
    throw error;
  }
};

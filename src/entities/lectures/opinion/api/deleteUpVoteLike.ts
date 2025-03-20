import { authApiClient } from '../../../../shared/api/authApiClient';

export const deleteUpVoteLike = async (opinionId: number): Promise<any> => {
  try {
    console.log('추천 추천 취소');
    const response = await authApiClient.delete(
      `/up-votes/${opinionId}/unlike`
    );
    return response.data;
  } catch (error) {
    console.error('📌 추천 추천취소 실패1:', error);
    throw error;
  }
};

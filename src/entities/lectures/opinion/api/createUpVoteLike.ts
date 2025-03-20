import { authApiClient } from '../../../../shared/api/authApiClient';

export const createUpVoteLike = async (opinionId: number): Promise<any> => {
  try {
    console.log('추천글 추천');
    const response = await authApiClient.post(
      `/up-vote/${opinionId}/like`,
      null
    );
    return response.data;
  } catch (error) {
    console.error('📌 추천글 추천 실패1:', error);
    throw error;
  }
};

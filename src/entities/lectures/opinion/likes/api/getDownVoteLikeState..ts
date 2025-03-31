import { authApiClient } from '../../../../../shared/api/authApiClient';

export const getDownVoteLikeState = async (opinionId: number): Promise<any> => {
  const response = await authApiClient.get(
    `/down-votes/${opinionId}/like/exists`
  );

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

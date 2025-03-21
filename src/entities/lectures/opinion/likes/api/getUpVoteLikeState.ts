import { authApiClient } from '../../../../../shared/api/authApiClient';

export const getUpVoteLikeState = async (opinionId: number): Promise<any> => {
  console.log(
    '강의데이터 요청 URL:',
    `${authApiClient.defaults.baseURL}/up-votes/${opinionId}/like/exists`
  );
  const response = await authApiClient.get(
    `/up-votes/${opinionId}/like/exists`
  );

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

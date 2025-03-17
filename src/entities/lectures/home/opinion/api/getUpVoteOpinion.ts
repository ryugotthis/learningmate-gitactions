import { apiClient } from '../../../../../shared/api/apiClient';

export const getUpVoteOpinion = async ({
  postId,
  sort = 'likes',
}: {
  postId: number;
  sort: string;
}): Promise<any> => {
  console.log(
    '강의데이터 요청 URL:',
    `${apiClient.defaults.baseURL}//posts/${postId}/up-votes`
  );
  const sortQuery =
    sort === 'desc' ? `sort=createTime,desc` : `sort=${sort},desc`;
  const url = `/posts/${postId}/up-votes?${sortQuery}`;
  const response = await apiClient.get(url);

  console.log('📌추천 의견 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

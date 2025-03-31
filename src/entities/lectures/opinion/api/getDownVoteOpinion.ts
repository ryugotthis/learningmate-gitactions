import { apiClient } from '../../../../shared/api/apiClient';

export const getDownVoteOpinion = async ({
  postId,
  sort = 'likes',
}: {
  postId: number;
  sort: string;
}): Promise<any> => {
  const sortQuery =
    sort === 'desc' ? `sort=createTime,desc` : `sort=${sort},desc`;
  const url = `/posts/${postId}/down-votes?${sortQuery}`;
  const response = await apiClient.get(url);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

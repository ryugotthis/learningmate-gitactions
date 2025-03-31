import { apiClient } from '../../../../shared/api/apiClient';

export const getUpVoteOpinion = async ({
  postId,
  sort = 'likes',
}: {
  postId: number;
  sort: string;
}): Promise<any> => {
  const sortQuery =
    sort === 'desc' ? `sort=createTime,desc` : `sort=${sort},desc`;
  const url = `/posts/${postId}/up-votes?${sortQuery}`;
  const response = await apiClient.get(url);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};

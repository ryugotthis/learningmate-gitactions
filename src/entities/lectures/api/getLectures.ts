import { apiClient } from '../../../shared/api/apiClient';

export const getLectures = async ({
  pageParam,
  platforms,
  title,
  sort = 'likes',
}: {
  pageParam?: number;
  platforms?: string[];
  title?: string | null;
  sort?: string;
}): Promise<any> => {
  const platformsQuery = platforms
    ? `&platforms=${platforms.map(encodeURIComponent).join(',')}`
    : '';
  const titleQuery = title ? `&title=${encodeURIComponent(title)}` : '';
  const sortQuery =
    sort === 'desc' ? `&sort=createTime,desc` : `&sort=${sort},desc`;
  const url = `/lectures?size=9&page=${pageParam}${platformsQuery}${titleQuery}${sortQuery}`;
  const response = await apiClient.get(url);

  return response.data; // ✅ 올바르게 `data`만 반환
};

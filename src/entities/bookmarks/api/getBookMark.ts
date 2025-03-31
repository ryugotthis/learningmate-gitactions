import { authApiClient } from '../../../shared/api/authApiClient';

export const getBookMark = async ({
  sort,
  page,
  platforms,
}: {
  sort: string;
  page: number;
  platforms?: string[];
}): Promise<any> => {
  const platformsQuery = platforms
    ? `&platforms=${platforms.map(encodeURIComponent).join(',')}`
    : '';

  const sortQuery =
    sort === 'desc' ? `&sort=createTime,desc` : `&sort=${sort},desc`;
  const url = `/bookmarks?size=9&page=${page}${platformsQuery}${sortQuery}`;
  // const url = `/bookmarks?size=9&page=${page}`;
  const response = await authApiClient.get(url);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
